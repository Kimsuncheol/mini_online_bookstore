# AI Search Implementation Guide

## Overview

The AI Book Search feature has been fully integrated into the SearchModal component with complete API communication capabilities. This feature allows users to have natural language conversations with an AI assistant to discover and learn about books.

## Architecture

### Component Structure

```
SearchModal (Main Container)
├── Mode: 'search' | 'ai'
├── SearchModeContent (Traditional Search)
└── AIModeContent (AI Assistant)
    ├── AIModalHeader (with back button)
    ├── AIMessageList
    │   ├── AIEmptyState
    │   ├── AIMessageBubble
    │   │   └── AIBookRecommendations
    │   └── AILoadingIndicator
    ├── AIInputArea
    └── useAIConversation (custom hook)
```

### File Structure

#### Core Components
- `src/app/components/search/SearchModal.tsx` - Main modal with mode switching
- `src/app/components/search/AIModeContent.tsx` - AI mode container
- `src/app/components/search/SearchModeContent.tsx` - Search mode container

#### AI Subcomponents
- `src/app/components/search/ai/useAIConversation.ts` - Business logic hook
- `src/app/components/search/ai/AIMessageList.tsx` - Message container
- `src/app/components/search/ai/AIMessageBubble.tsx` - Individual message display
- `src/app/components/search/ai/AIBookRecommendations.tsx` - Book recommendations display
- `src/app/components/search/ai/AIModalHeader.tsx` - AI mode header
- `src/app/components/search/ai/AIInputArea.tsx` - Input field
- `src/app/components/search/ai/AIEmptyState.tsx` - Empty state display
- `src/app/components/search/ai/AILoadingIndicator.tsx` - Loading indicator
- `src/app/components/search/ai/AIErrorMessage.tsx` - Error display

#### Services
- `src/services/aiSearchService.ts` - API communication service

#### Types
- `src/interfaces/aiSearch.d.ts` - TypeScript interfaces

## API Integration

### Endpoint Used

**POST** `/api/ai-search/search`

**Request:**
```typescript
{
  question: string        // User's natural language question
  userEmail: string      // User's email from Firebase Auth
  conversationId?: string // Optional: for continuing conversations
}
```

**Response:**
```typescript
{
  success: boolean
  data?: {
    questionId: string
    answerId: string
    answer: string        // AI's response
    recommendedBooks?: {
      bookId: string
      title: string
      author: string
      price: number
      coverImageUrl?: string
      relevanceScore: number
      reason: string
    }[]
    suggestions?: string[]
    conversationId?: string
  }
  error?: {
    code: string
    message: string
  }
}
```

### API Service Functions

All API functions are available in `src/services/aiSearchService.ts`:

1. **searchWithAI()** - Main search function
2. **getQuestion()** - Get question by ID
3. **getAnswer()** - Get answer by ID
4. **getAnswersForQuestion()** - Get all answers for a question
5. **getConversation()** - Get conversation by ID
6. **getUserConversations()** - Get user's conversations
7. **getSearchHistory()** - Get user's search history
8. **healthCheck()** - Check API health

## Features

### ✅ Implemented Features

1. **Seamless Mode Switching**
   - Click AI button to switch from search to AI mode
   - Click back arrow to return to search mode
   - Modal size dynamically adjusts

2. **Real-time AI Communication**
   - Sends user questions to backend API
   - Displays AI responses in chat format
   - Maintains conversation context with conversation ID

3. **Book Recommendations**
   - AI can recommend books based on the conversation
   - Each recommendation shows:
     - Book cover image
     - Title and author
     - Price
     - Relevance score
     - Reason for recommendation
   - Clickable cards navigate to book detail page

4. **Authentication Integration**
   - Uses Firebase Auth for user identification
   - Shows friendly message if user not logged in
   - Passes user email to API for tracking

5. **Error Handling**
   - Graceful error messages in chat
   - Network error handling
   - API error response handling
   - Loading states

6. **Auto-scrolling**
   - Automatically scrolls to latest message
   - Smooth scroll behavior

7. **History Management**
   - Conversation history clears when modal closes
   - Each conversation gets a unique ID
   - Messages persist within a session

## Configuration

### Environment Variables

Add to your `.env` file:

```bash
# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

For production, update to your production API URL.

### API Base URL

The API base URL is configured in `src/services/aiSearchService.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
```

## Usage

### User Flow

1. **Open Search Modal**: Click search icon in header
2. **Switch to AI Mode**: Click AI button (sparkle icon)
3. **Ask Questions**: Type natural language questions about books
4. **View Recommendations**: AI provides answers with book recommendations
5. **Click Books**: Click on recommended books to view details
6. **Return to Search**: Click back arrow to return to traditional search

### Example Questions

- "What are some good mystery novels?"
- "I need a book about ancient Rome"
- "Recommend a fantasy series for young adults"
- "Find me books similar to Harry Potter"
- "What's a good introduction to machine learning?"

## Development

### Adding New Features

#### To add a new message type:

1. Extend `ExtendedAISearchMessage` in `useAIConversation.ts`
2. Update `AIMessageBubble.tsx` to render the new type
3. Update API response handling in `useAIConversation.ts`

#### To add new API endpoints:

1. Add function to `src/services/aiSearchService.ts`
2. Import and use in components as needed

### Testing

To test the integration:

1. **Start Backend API**: Ensure Python FastAPI server is running on port 8000
2. **Start Frontend**: Run `npm run dev`
3. **Sign In**: Make sure you're logged in with Firebase Auth
4. **Open Search**: Click search icon
5. **Test AI Mode**: Click AI button and ask a question

### Debugging

Check these if issues occur:

- **Console Errors**: Open browser DevTools
- **Network Tab**: Check API requests/responses
- **Backend Logs**: Check FastAPI server logs
- **Environment Variables**: Verify `.env` configuration
- **Firebase Auth**: Ensure user is authenticated

## API Requirements

Your backend API must:

1. Run on the configured URL (default: http://localhost:8000)
2. Implement the `/api/ai-search/search` POST endpoint
3. Accept the request format specified above
4. Return the response format specified above
5. Handle CORS for your frontend origin

## Future Enhancements

Potential improvements:

- [ ] Conversation persistence across sessions
- [ ] Conversation history sidebar
- [ ] Export conversation to PDF
- [ ] Voice input support
- [ ] Suggested follow-up questions
- [ ] Multi-language support
- [ ] Rate limiting indicators
- [ ] Typing indicators
- [ ] Message reactions
- [ ] Share conversations

## Troubleshooting

### "Please sign in to use AI Book Assistant"
- **Cause**: User not authenticated
- **Solution**: Sign in with Firebase Auth

### API Errors
- **Cause**: Backend not running or unreachable
- **Solution**: Start backend server, check URL in .env

### No Book Recommendations
- **Cause**: API returned answer without books
- **Solution**: This is normal - AI may not always recommend books

### Modal Width Issues
- **Cause**: Mode state changing during animation
- **Solution**: Already fixed - mode resets when modal opens, not closes

## Summary

The AI Search feature is fully implemented with:
- ✅ Complete API integration
- ✅ Real-time communication with backend
- ✅ Book recommendations display
- ✅ Error handling
- ✅ Authentication integration
- ✅ Modular, maintainable code
- ✅ TypeScript type safety
- ✅ Smooth UX with auto-scrolling
- ✅ Conversation management

The feature is production-ready pending backend API availability.
