import { h, Component } from 'preact'
import styled from 'styled-components'
import { Form } from 'react-final-form'
import { connect } from '../../preact-smitty'
import { pathOr, pathEq, compose, has, propOr, isNil, complement } from 'ramda'

import Button from '../../components/Button'
import LabeledField from '../../components/forms/LabeledField'
import {
  ResultMessage,
  FormWrapper,
  Info,
  ButtonWrapper,
  FormGrid
} from './RegistrationForm'
import store from '../../store'
import { toOrdinal } from '../../helpers/ordinal'

import { isEmail } from '../../helpers/validation'

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
`

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid format'
  }
  if (!values.token) {
    errors.token = 'Required'
  }
  return errors
}

class CancellationForm extends Component {
  handleReset = reset => () => {
    reset()
    store.actions.resetApi({ key: 'verification' })
  }
  onSubmit = values =>
    store.actions.get({
      key: 'verification',
      resource: 'registration',
      id: this.props.eventId,
      params: { e: values.email, t: values.verificationToken }
    })
  render({
    hasStatus,
    loading,
    showErrorMsg,
    showSuccessMsg,
    valid,
    waitListPosition
  }) {
    return (
      <FormWrapper>
        <Form
          id="verification"
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit, valid, pristine, reset }) => (
            <form onSubmit={handleSubmit}>
              <Info>
                To check your registration or your position in the wait list for
                the event on {this.props.eventDate}, submit the token sent you
                by email. It should consist of two silly words joined by a
                hyphen.
              </Info>
              <GridContainer>
                <FormGrid
                  columns="500px"
                  columnsTablet="400px"
                  columnsPhone="330px"
                >
                  <LabeledField
                    name="email"
                    label="Email (required)"
                    type="email"
                    placeholder="bob.smith@codeshop.com"
                  />
                  <LabeledField
                    name="verificationToken"
                    label="Verification token (required)"
                    type="text"
                    placeholder="word1-word2"
                  />
                </FormGrid>
              </GridContainer>
              <ButtonWrapper>
                <Button
                  type="submit"
                  loading={loading}
                  transparent
                  disabled={pristine || !valid || hasStatus}
                  valid={valid}
                  minWidth={123}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  light
                  disabled={loading}
                  valid={valid}
                  minWidth={123}
                  onClick={this.handleReset(reset)}
                >
                  Reset
                </Button>
              </ButtonWrapper>
            </form>
          )}
        />
        {showSuccessMsg && (
          <ResultMessage
            type="success"
            message={
              waitListPosition
                ? `You are ${toOrdinal(
                    waitListPosition
                  )} in the waiting list for this event.`
                : 'Yep, you are registered for this event.'
            }
          />
        )}
        {showErrorMsg && (
          <ResultMessage
            type="info"
            message="Oops, that didn't work. Are you sure you entered the correct token?"
          />
        )}
      </FormWrapper>
    )
  }
}

const verificationPath = ['api', 'verification']
const verificationStatusPath = verificationPath.concat(['status'])
const verificationDataPath = verificationPath.concat(['data'])
const getWaitListPosition = compose(
  propOr(false, 'waitListed'),
  pathOr({}, verificationDataPath)
)
const maybeHasData = compose(
  complement(isNil),
  pathOr(null, verificationDataPath)
)

const mapStateToProps = state => {
  const hasStatus = compose(has('status'), pathOr({}, verificationPath))(state)
  const loading = pathEq(verificationStatusPath, 'started', state)
  const hasData = maybeHasData(state)
  const showSuccessMsg = pathEq(verificationStatusPath, 200, state) && hasData
  const waitListPosition = getWaitListPosition(state)
  const showErrorMsg = hasStatus && !loading && !showSuccessMsg

  return {
    hasStatus,
    loading,
    showSuccessMsg,
    showErrorMsg,
    waitListPosition
  }
}

export default connect(mapStateToProps)(CancellationForm)