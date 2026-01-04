import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates admin authentication for API routes
 * Uses the same password as the client-side admin login
 */
export function validateAdminAuth(request: NextRequest): { valid: boolean; error?: NextResponse } {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  
  // If no password is configured, deny access
  if (!adminPassword) {
    return {
      valid: false,
      error: NextResponse.json(
        { error: 'Admin access not configured' },
        { status: 503 }
      ),
    };
  }
  
  // Check for auth header
  const authHeader = request.headers.get('x-admin-auth');
  
  if (authHeader !== adminPassword) {
    return {
      valid: false,
      error: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      ),
    };
  }
  
  return { valid: true };
}
