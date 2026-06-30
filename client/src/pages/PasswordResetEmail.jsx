import React from "react";
import { Link, useLocation } from "react-router-dom";

const PasswordResetEmail = () => {
      const location = useLocation();
      const email = location.state?.email;

      return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-white p-4">
                  <div className="max-w-md w-full bg-primary-white p-8 rounded-2xl shadow-md text-center">

                        <div className="text-5xl mb-4">📧</div>

                        <h1 className="text-2xl font-bold mb-3">
                              Check your email
                        </h1>

                        <p className="text-secondary-black mb-6">
                              We've sent a password reset link
                              {email && <> to <strong>{email}</strong></>}.
                        </p>

                        <p className="text-sm text-secondary-black mb-8">
                              Please check your <strong>inbox</strong> or <strong>spam</strong> folder.
                              The reset link will expire in 5 minutes.
                        </p>

                        <Link
                              to="/auth/login"
                              className="inline-block px-6 py-3 rounded-xl bg-primary-black text-primary-white"
                        >
                              Back to Login
                        </Link>
                  </div>
            </div>
      );
};

export default PasswordResetEmail;