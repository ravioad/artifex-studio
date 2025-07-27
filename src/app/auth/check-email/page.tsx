import React from 'react';

const CheckEmailPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg  w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Check Your Email</h2>
        <p className="text-gray-700 mb-6">
          A verification link has been sent to your email address. Please click the link to confirm your account and complete the sign-up process.
        </p>
        <p className="text-gray-600 text-sm">
          (Remember to check your spam folder if you don&apos;t see it in your inbox.)
        </p>
        {/* Optionally add a resend email button here, which would hit another backend endpoint */}
      </div>
    </div>
  );
};

export default CheckEmailPage;