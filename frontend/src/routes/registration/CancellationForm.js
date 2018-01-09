import { h, Component } from 'preact'
import styled from 'styled-components'
import { Form } from 'react-final-form'
import { connect } from '../../preact-smitty'
import R from '../../helpers'

import Button from '../../components/Button'
import LabeledField from '../../components/forms/LabeledField'
import {
  ResultMessage,
  FormWrapper,
  Info,
  ButtonWrapper,
  FormGrid
} from './RegistrationForm'

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
  if (!values.verificationToken) {
    errors.verificationToken = 'Required'
  }
  return errors
}

class CancellationForm extends Component {
  handleReset = reset => () => {
    reset()
    this.props.actions.resetApi({ key: 'cancellation' })
  }
  onSubmit = (values, form) => {
    this.props.actions.delete({
      key: 'cancellation',
      resource: 'registration',
      id: this.props.eventId,
      values
    })
    form.reset()
  }
  render({ hasStatus, loading, showErrorMsg, showSuccessMsg, valid }) {
    return (
      <FormWrapper>
        <Form
          id="cancellation"
          onSubmit={this.onSubmit}
          validate={validate}
          render={({ handleSubmit, valid, pristine, reset }) => (
            <form onSubmit={handleSubmit}>
              <Info>
                To cancel your registration for the event on{' '}
                {this.props.eventDate}, submit the token sent you by email. It
                should consist of two silly words joined by a hyphen.
              </Info>
              {showSuccessMsg && (
                <ResultMessage
                  type="success"
                  message="Your registration is cancelled. Please check your email (SPAM folder?) for confirmation."
                />
              )}
              {showErrorMsg && (
                <ResultMessage
                  type="info"
                  message="Oops, an error occurred. Are you sure you entered the correct token?"
                />
              )}
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
      </FormWrapper>
    )
  }
}

const cancellationPath = ['api', 'cancellation']
const cancellationStatusPath = cancellationPath.concat(['status'])

const mapStateToProps = state => {
  const hasStatus = R.compose(R.has('status'), R.pathOr({}, cancellationPath))(
    state
  )
  const loading = R.pathEq(cancellationStatusPath, 'started', state)
  const showSuccessMsg = R.pathEq(cancellationStatusPath, 202, state)
  const showErrorMsg = hasStatus && !loading && !showSuccessMsg

  return {
    hasStatus,
    loading,
    showSuccessMsg,
    showErrorMsg
  }
}

export default connect(mapStateToProps)(CancellationForm)
