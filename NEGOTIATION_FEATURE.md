# Price Negotiation Feature

## Overview
The StudentNest application now includes a price negotiation feature that allows potential tenants to propose alternative rental prices directly to room owners through the integrated chat system.

## How It Works

### For Students/Tenants:
1. **Navigate to Room Details**: Visit any room listing page
2. **Find the "Negotiate Price" Button**: Located in the booking panel (green button)
3. **Open Negotiation Modal**: Click the button to open the price negotiation form
4. **Enter Proposed Price**:
   - Must be less than the current listing price
   - Must be at least 50% of the original price (reasonable offer validation)
   - Shows percentage discount automatically
5. **Add Personal Message**: Explain why you're proposing this price
6. **Send Request**: The system will automatically create a chat with the room owner and send your negotiation message

### For Room Owners:
- Receive negotiation requests directly in their chat/messages
- Can respond with counter-offers, acceptance, or rejection
- All communication happens through the existing chat system

## Technical Implementation

### Components Added/Modified:
1. **PriceNegotiationModal**: New modal component for price negotiation form
2. **BookingPanel**: Updated to include "Negotiate Price" button
3. **ChatContext**: Enhanced to support starting chats with owners

### Features:
- **Form Validation**: Ensures reasonable price proposals
- **Real-time Feedback**: Shows discount percentage as user types
- **Integration with Chat System**: Automatically starts conversations
- **Toast Notifications**: Provides success/error feedback
- **Responsive Design**: Works on all device sizes

### Message Format:
When a user submits a negotiation request, the following message is automatically sent to the room owner:

```
Hi! I'm interested in your property "[Room Title]". I would like to negotiate the price from ₹[Current Price] to ₹[Proposed Price]/month.

My message: [User's custom message]

Please let me know if this works for you. Looking forward to your response!
```

## UI/UX Features:
- **Animated Button**: Uses ShinyText animation for visual appeal
- **Green Color Scheme**: Indicates money/savings theme
- **Loading States**: Shows spinner during submission
- **Error Handling**: Clear error messages for validation failures
- **Success Feedback**: Confirmation when request is sent successfully

## Benefits:
1. **Increased Engagement**: Students can actively negotiate instead of just accepting listed prices
2. **Better Communication**: Direct communication channel between students and owners
3. **Market Dynamics**: Enables price flexibility based on demand and student budgets
4. **User Empowerment**: Gives students a voice in pricing discussions

## Future Enhancements:
- Counter-offer system
- Negotiation history tracking
- Price trend analytics
- Automated responses for owners
- Bulk negotiation for multiple rooms
