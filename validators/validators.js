const { z } = require('zod')

const authSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(100, 'Password must be less than 100 characters')
    // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .regex(/[0-9]/, 'Password must contain at least one number')
    // .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
});

module.exports = authSchema