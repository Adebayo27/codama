import React from "react";
import { Alert, Button, TextInput } from "flowbite-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  RecaptchaVerifier,
  auth,
  signInWithPhoneNumber,
} from "../../config/firebase";
import { ConfirmationResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [confirmationResult, setConfirmationResult] =
    React.useState<ConfirmationResult | null>(null);
  const [show, setShow] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    if (phoneNumber.length < 10) {
      setError("Phone number not valid");
      setIsError(true);
      return;
    }
    setLoading(true);

    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {}
      );
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setShow(true);
      setIsSuccess(true)
      setLoading(false);
    } catch (error) {
      setShow(false);
      setLoading(false);
      setIsError(true);
      setError(`Error sending code: ${error}`);
      console.error("Error sending code:", error);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);

    try {
      await confirmationResult!.confirm(verificationCode);
      console.log("Successfully signed in with phone number");
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      setLoading(false);
      setIsError(true);
      console.error("Error verifying code:", error);
      setError(`Error sending code: ${error}`);
    }
  };

  return (
    <div className="h-screen w-screen justify-center m-auto">
      <div className="h-screen justify-center mx-auto flex max-w-md flex-col gap-4 px-12 ">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        {isError && (
          <>
            <Alert color="failure" onDismiss={() => setIsError(!isError)}>
              <span className="font-medium">Error:</span> {error}
            </Alert>
          </>
        )}

        {isSuccess && (
          <>
            <Alert color="success" onDismiss={() => setIsSuccess(!isSuccess)}>
              <span className="font-medium">Success:</span> OTP sent to your phone
            </Alert>
          </>
        )}

        {!show && (
          <>
            <PhoneInput
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e!)}
              placeholder="Enter phone number"
            />
            <Button onClick={handleSignIn} isProcessing={loading}>
              Send Code
            </Button>
            <div id="recaptcha-container" className="justify-center flex"></div>
          </>
        )}

        {show && (
          <>
            <TextInput
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
            />
            <Button onClick={handleVerifyCode} isProcessing={loading}>
              Verify Code
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
