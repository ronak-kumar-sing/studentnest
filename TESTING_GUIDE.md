# Testing the Price Negotiation Feature

## Quick Test Guide

### 1. Access the Application
- Open your browser and go to `http://localhost:5173/`
- Navigate to any room listing by clicking on a room card on the homepage

### 2. Test the Negotiation Feature
1. **Scroll to the Booking Panel** (right side of room details page)
2. **Look for the Green "Negotiate Price" Button** (should be between "Book Now" and "Schedule Visit")
3. **Click "Negotiate Price"** to open the negotiation modal

### 3. Fill Out the Negotiation Form
1. **Proposed Price**: Enter a price lower than the current room price
   - Example: If room is ₹8,500, try ₹7,000
   - You'll see a percentage discount indicator (e.g., "18% off")
2. **Message**: Add a personal message explaining your offer
   - Example: "I'm a final year student with a limited budget. This price would work perfectly for my situation."
3. **Click "Send Request"**

### 4. Expected Behavior
- ✅ Form validation should prevent unreasonable offers (too high, too low)
- ✅ Success toast notification should appear
- ✅ Modal should close after successful submission
- ✅ Console should log the chat creation and message

### 5. Testing Edge Cases

#### Valid Tests:
- Propose 50-90% of the original price ✅
- Add meaningful message ✅
- Use different room listings ✅

#### Invalid Tests (Should show error messages):
- Leave price field empty ❌
- Propose price higher than current ❌
- Propose extremely low price (< 50% of original) ❌
- Leave message field empty ❌

## What Happens Behind the Scenes

1. **Form Validation**: Client-side validation ensures reasonable offers
2. **Chat Creation**: System creates a new chat between student and room owner
3. **Message Generation**: Automated message sent to owner with negotiation details
4. **UI Feedback**: Toast notifications inform user of success/failure

## Sample Negotiation Message Format
```
Hi! I'm interested in your property "Cozy Single Room Near DU". I would like to negotiate the price from ₹8,500 to ₹7,000/month.

My message: I'm a final year student with a limited budget. This price would work perfectly for my situation.

Please let me know if this works for you. Looking forward to your response!
```

## Check Browser Console
Open browser developer tools (F12) and check console for:
- Chat creation logs
- Message sending confirmations
- Any error messages

## Current Room Examples in Sample Data:
1. **Room-001**: "Cozy Single Room Near DU" - ₹8,500/month
2. **Room-002**: "Premium Shared Room with AC" - ₹6,500/month
3. **Room-003**: "Studio Apartment Near Metro" - ₹12,500/month

Try negotiating on different rooms to test the feature comprehensively!
