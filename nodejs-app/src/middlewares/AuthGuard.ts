import { createParamDecorator, Action } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import { config } from '../config/config'; // Adjust based on your project structure

export function AuthGuard(): any {
  return createParamDecorator({
    value: (action: Action) => {
      const token = action.request.headers['authorization']?.split(' ')[1];

      if (!token) {
        action.response.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
      }

      try {
        const decoded = jwt.verify(token, config.JWT_SECRET as string);
        action.request.user = decoded; // Attach the decoded token to the request
        return decoded; // Proceed to the next middleware/controller
      } catch (error) {
        action.response.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
      }
    }
  });
}
