# GET vs POST Decision for x402 Donation Endpoints

**Date:** November 19, 2025
**Decision:** ✅ Use GET (not POST)
**Reason:** Follow official x402 documentation patterns to minimize errors

---

## 📋 Executive Summary

After careful analysis of official x402 documentation, we've decided to use **GET requests** for donation endpoints, matching the official x402 pattern exactly.

**Before:**
```typescript
'POST /api/donate': { price: '$1.00', ... }
app.post('/api/donate', handler);
```

**After:**
```typescript
'GET /api/donate': { price: '$1.00', ... }
app.get('/api/donate', handler);
```

---

## 🎯 Official x402 Documentation Analysis

### What the Official Docs Show:

**From Quickstart Guide:**
```javascript
// Express.js example
{
  "GET /weather": {
    price: "$0.001",
    network: "base-sepolia",
    config: { ... }
  }
}

app.get("/weather", (req, res) => {
  res.send({ weather: "sunny", temperature: 70 });
});
```

**Key Findings:**
- ✅ All official examples use **GET exclusively**
- ✅ No POST examples provided anywhere
- ✅ No guidance on when to use POST vs GET
- ✅ Examples focus on "getting access to a resource"

---

## 🤔 Why This Matters

### Initial Confusion:
Donations are typically **state-changing operations** in traditional REST APIs:
- ❌ Traditional REST: POST for creating resources
- ❌ Traditional REST: POST for state changes
- ❌ Traditional REST: GET for read-only operations

### x402 Pattern Understanding:
x402 has a **different semantic model**:
- ✅ x402: Payment is required to GET access to a resource
- ✅ x402: The resource might be data, content, or even a "thank you" message
- ✅ x402: HTTP method describes **resource access**, not **payment type**
- ✅ x402: Payment mechanism is separate (X-PAYMENT header)

---

## 💡 The x402 Mental Model

### Traditional REST Thinking (WRONG for x402):
```
POST /api/donate
→ "Create a donation"
→ State change operation
→ Use POST
```

### x402 Thinking (CORRECT):
```
GET /api/donate
→ "Get access to the donation resource"
→ Payment required for access (via x402)
→ Use GET (match official pattern)
```

**Key Insight:** In x402, the payment happens **orthogonally** to the HTTP method. The HTTP method describes what resource you're accessing, not how you're paying for it.

---

## ✅ Decision Rationale

### 1. Follow Official Examples (Primary Reason)
**User's Principle:** "Follow docs best practices to minimize error"

- Official docs show GET exclusively
- No deviation examples provided
- Best practice: Match official patterns exactly

### 2. Minimize Risk
- Deviating from official examples = potential edge cases
- Unknown if POST is fully supported
- Unknown if POST behaves differently
- Safety in following established patterns

### 3. Consistency with x402 Ecosystem
- Other x402 implementations will use GET
- x402 Bazaar listings will expect GET
- Community examples will use GET
- Better interoperability

### 4. Easier Troubleshooting
- If issues arise, official docs will help
- Community support expects GET pattern
- Coinbase support familiar with GET pattern

---

## 🔄 Updated Implementation

### Server-Side (Express.js):
```typescript
import { paymentMiddleware } from 'x402-express';

app.use(paymentMiddleware(
  process.env.RECIPIENT_ADDRESS!,
  {
    'GET /api/donate': {  // ✅ Changed from POST to GET
      price: '$1.00',
      network: 'base-sepolia',
      config: {
        description: 'Support this creator with crypto donations',
        inputSchema: { /* ... */ },
        outputSchema: { /* ... */ }
      }
    }
  },
  { url: 'https://x402.org/facilitator' }
));

// ✅ Changed from app.post to app.get
app.get('/api/donate', (req, res) => {
  res.json({
    success: true,
    message: 'Thank you for your donation! ☕'
  });
});
```

### Client-Side (Widget):
```typescript
export const processPayment = async (endpoint: string) => {
  // 1. Initial GET request (trigger 402)
  const initialResponse = await fetch(endpoint, {
    method: 'GET'  // ✅ Changed from POST to GET
  });

  // ... x402 payment flow ...

  // 2. Retry GET with payment
  const paymentResponse = await fetch(endpoint, {
    method: 'GET',  // ✅ Changed from POST to GET
    headers: {
      'X-PAYMENT': paymentHeader
    }
  });

  return paymentResponse.json();
};
```

---

## 📊 Impact Analysis

### What Changes:
- ✅ HTTP method: POST → GET
- ✅ Server route: `app.post()` → `app.get()`
- ✅ Client requests: `method: 'POST'` → `method: 'GET'`
- ✅ Route config: `'POST /api/donate'` → `'GET /api/donate'`

### What Stays the Same:
- ✅ Payment flow (402 → sign → retry)
- ✅ X-PAYMENT header structure
- ✅ Facilitator integration
- ✅ Viem wallet signing
- ✅ UI/UX components
- ✅ USDC token handling

**Impact Level:** Low - Simple find/replace of HTTP method

---

## 🚫 What We're NOT Doing

### ❌ Don't Create Hybrid Approach:
```typescript
// ❌ WRONG - Don't do this
'GET /api/donate': { ... },   // For reads?
'POST /api/donate': { ... }   // For donations?
```

**Why:** Confusing, deviates from official pattern, adds complexity

### ❌ Don't Try to Be "More RESTful":
```typescript
// ❌ WRONG - Don't override x402 pattern
'POST /api/donate': { ... }  // "Because donations are state changes"
```

**Why:** x402 has its own semantic model, not traditional REST

---

## 📚 Supporting Documentation

### Official x402 Resources:
1. **Quickstart for Sellers:** https://docs.cdp.coinbase.com/x402/quickstart-for-sellers
   - All examples use GET
   - No POST examples anywhere

2. **x402 GitBook:** https://x402.gitbook.io/x402
   - Describes payment flow
   - No HTTP method guidance

3. **GitHub Examples:** https://github.com/coinbase/x402
   - TypeScript examples use GET
   - Consistent across all frameworks

---

## ✅ Validation Checklist

- [x] Reviewed official documentation (all use GET)
- [x] Analyzed x402 semantic model (payment to access resource)
- [x] Updated REFACTORING_PLAN.md (server examples)
- [x] Updated REFACTORING_PLAN.md (client examples)
- [x] Updated X402_ALIGNMENT_VERIFICATION.md
- [x] Documented decision rationale
- [x] Explained to user why GET is correct
- [x] Confirmed alignment with official patterns

---

## 🎓 Key Lessons

### 1. Protocol Semantics Matter
Different protocols have different mental models. x402's model is:
- Payment is orthogonal to HTTP method
- HTTP method describes resource access
- Payment happens via X-PAYMENT header

### 2. Follow Official Patterns First
When integrating any protocol:
1. Study official examples thoroughly
2. Match patterns exactly
3. Don't "improve" without understanding why
4. Deviate only with strong evidence

### 3. Question Your Assumptions
Our initial assumption:
- "Donations are state changes → use POST"

Correct understanding:
- "x402 is about accessing resources → use GET (official pattern)"

---

## 🚀 Next Steps

1. ✅ Decision documented
2. ⏳ Implement in Phase 2 refactoring
3. ⏳ Test GET pattern on Base Sepolia
4. ⏳ Verify 402 response works with GET
5. ⏳ Confirm payment flow end-to-end

---

**Conclusion:** Using GET aligns perfectly with official x402 documentation and minimizes the risk of unexpected behavior. This is the correct choice for protocol compliance.

**Status:** ✅ Decision Final - Use GET
