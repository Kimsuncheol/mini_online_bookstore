import { NextResponse } from 'next/server'

/**
 * Placeholder signup handler.
 * Replace with real implementation once user registration requirements are defined.
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: 'Signup endpoint not implemented.',
    },
    { status: 501 }
  )
}

export function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST for signup.',
    },
    { status: 405 }
  )
}
