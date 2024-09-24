import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { orderCreationId, razorpayPaymentId, razorpaySignature } =
    await request.json();

  const keySecret = process.env.RAZORPAY_KEY_SECRET!;

  const isValidated = validatePaymentVerification(
    { order_id: orderCreationId, payment_id: razorpayPaymentId },
    razorpaySignature,
    keySecret
  );

  if (!isValidated) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }

  // once verified send api call to dynamodb and store all the order related information
  return NextResponse.json(
    { message: "payment verified successfully", isOk: true },
    { status: 200 }
  );
}
