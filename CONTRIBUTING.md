# Contributing to RCA-SDA Church Management System

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit: `git commit -m "Add: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code structure
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use Tailwind CSS for styling

## Component Guidelines

### File Structure
```
components/
├── ComponentName.tsx    # Component file
└── README.md           # Component documentation (if complex)
```

### Component Template
```typescript
'use client'; // Only if using hooks/state

import { ComponentProps } from '@/types';

interface Props {
  // Define props
}

export default function ComponentName({ prop1, prop2 }: Props) {
  // Component logic
  
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

## Commit Message Format

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add member search functionality
fix: resolve Sabbath report date picker issue
docs: update API documentation
```

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update the README.md if adding new features
4. Request review from maintainers
5. Address review comments
6. Wait for approval and merge

## Feature Requests

To request a feature:

1. Check if it already exists in Issues
2. Create a new issue with:
   - Clear description
   - Use case
   - Expected behavior
   - Mockups (if applicable)

## Bug Reports

When reporting bugs, include:

1. Description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment details (browser, OS, etc.)

## Code Review Guidelines

When reviewing code:

- Be respectful and constructive
- Focus on the code, not the person
- Explain why changes are needed
- Suggest improvements
- Approve when ready

## Testing

Before submitting:

- Test all functionality manually
- Check responsive design
- Test in different browsers
- Verify dark mode works
- Check accessibility

## Questions?

Feel free to:
- Open an issue for questions
- Join our community discussions
- Contact the maintainers

Thank you for contributing! 🙏
