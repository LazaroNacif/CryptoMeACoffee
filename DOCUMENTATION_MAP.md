# CryptoMeACoffee - Documentation Navigation Guide

**Last Updated:** November 19, 2025
**Purpose:** Single reference for navigating all project documentation

---

## 🎯 Quick Reference: Which Document for What?

### **For Claude Code / AI Assistant:**

**Primary Reference (Check First):**
1. **PROGRESS_TRACKER.md** - Current sprint, tasks, blockers, what's in progress
2. **REFACTORING_PLAN.md** - Current refactoring phase, step-by-step instructions
3. **CryptoMeACoffee_PRD.md** - Architecture boundaries, what we build vs x402 handles

**Order of Priority:**
```
PROGRESS_TRACKER.md          → Where are we NOW?
    ↓
REFACTORING_PLAN.md          → What are we DOING?
    ↓
CryptoMeACoffee_PRD.md       → What are we BUILDING?
```

---

## 📚 Document Hierarchy & Purpose

### **Tier 1: Active Work (Check Daily)**

#### 1. **PROGRESS_TRACKER.md**
**When to Check:** Every session start
**Purpose:** Real-time project status
**Contains:**
- ✅ Current sprint status (Sprint 1.5: x402 Refactoring)
- ✅ Kanban board (To Do, In Progress, Done)
- ✅ Current blockers and issues
- ✅ Sprint velocity and burndown
- ✅ Daily goals
- ✅ Learning log

**Use This For:**
- "What should I work on next?"
- "What's blocking progress?"
- "What's the current sprint goal?"
- "What have we completed?"

**Quick Check:**
```markdown
## 🎯 Current Sprint: Sprint 1.5 - x402 Protocol Compliance (NEW)
**Sprint Goal:** Refactor to properly use x402-express and Coinbase Facilitator
**Sprint Dates:** Nov 19-21 (3 days)
**Sprint Status:** 🔴 Not Started
```

---

#### 2. **REFACTORING_PLAN.md**
**When to Check:** During Sprint 1.5 (Nov 19-21)
**Purpose:** Step-by-step refactoring instructions
**Contains:**
- ✅ 3-phase refactoring approach
- ✅ Detailed implementation examples
- ✅ Code snippets (correct vs incorrect)
- ✅ Testing checklists
- ✅ Success criteria
- ✅ Verification status vs official docs

**Use This For:**
- "How do I implement x402-express?"
- "What code needs to change?"
- "What's the correct implementation pattern?"
- "What are the Phase 1/2/3 tasks?"

**Quick Check:**
```markdown
## ✅ Verification Status: Aligned with Official x402 Documentation
**Alignment Summary:**
- ✅ Package names confirmed
- ✅ Facilitator URLs confirmed
- ✅ Middleware approach matches official examples
- ✅ Using GET (not POST) per official patterns
```

---

#### 3. **CryptoMeACoffee_PRD.md**
**When to Check:** Before major decisions, architecture questions
**Purpose:** Product requirements & architecture boundaries
**Contains:**
- ✅ Product vision and goals
- ✅ Architecture boundaries (critical!)
- ✅ What we build vs what x402 handles
- ✅ Feature status and milestones
- ✅ Technical stack decisions
- ✅ Success criteria

**Use This For:**
- "Should we build this feature?"
- "Does x402 already handle this?"
- "What are our architecture boundaries?"
- "What's our target user?"
- "What are the sprint milestones?"

**Quick Check:**
```markdown
### Architecture Boundaries (Critical Understanding)
OUR RESPONSIBILITY:
  - Widget UI/UX
  - Integration examples
  - Documentation

x402 PROTOCOL RESPONSIBILITY:
  - Payment verification
  - Signature validation
  - Blockchain settlement
  - Gas sponsorship
```

---

### **Tier 2: Reference Documents (Check as Needed)**

#### 4. **REFACTORING_SUMMARY.md**
**Purpose:** Quick 2-page summary of refactoring
**Use When:** Need quick overview without details
**Contains:**
- Executive summary of the problem
- 3-phase plan overview
- What we keep vs remove
- Quick links

---

#### 5. **X402_ALIGNMENT_VERIFICATION.md**
**Purpose:** Proof that our plan aligns with official x402 docs
**Use When:** Questioning if approach is correct
**Contains:**
- Verification results (95% → 98% alignment)
- What's correct vs what needs clarification
- Phase 1 research checklist
- Official resource links

---

#### 6. **docs/GET_VS_POST_DECISION.md**
**Purpose:** Detailed rationale for using GET instead of POST
**Use When:** Questioning HTTP method choice
**Contains:**
- Decision rationale
- Official docs analysis
- x402 mental model explanation
- Impact analysis

---

### **Tier 3: Supporting Documents (Occasional Reference)**

#### 7. **README.md**
**Purpose:** Project overview for new users
**Status:** Needs update after refactoring
**Use When:** Onboarding new contributors

#### 8. **TESTING_GUIDE.md**
**Purpose:** How to test the implementation
**Use When:** Running tests, validation
**Needs:** Update after refactoring complete

#### 9. **LICENSE**
**Purpose:** MIT license
**Use When:** Legal/licensing questions

---

## 🔄 Workflow: How to Navigate During Development

### **Session Start Checklist:**

```bash
1. Open PROGRESS_TRACKER.md
   → Check current sprint status
   → Check "In Progress" tasks
   → Check blockers

2. If working on refactoring:
   → Open REFACTORING_PLAN.md
   → Find current phase (1, 2, or 3)
   → Follow step-by-step instructions

3. If unsure about architecture:
   → Open CryptoMeACoffee_PRD.md
   → Check "Architecture Boundaries" section
   → Verify what we should/shouldn't build
```

---

## 📊 Document Update Frequency

| Document | Update Frequency | Owner |
|----------|------------------|-------|
| PROGRESS_TRACKER.md | Daily | AI + User |
| REFACTORING_PLAN.md | Per phase completion | AI + User |
| CryptoMeACoffee_PRD.md | Per sprint | AI + User |
| REFACTORING_SUMMARY.md | Once (static) | AI |
| X402_ALIGNMENT_VERIFICATION.md | Once (static) | AI |
| docs/GET_VS_POST_DECISION.md | Once (static) | AI |

---

## 🎯 For Claude Code: Primary Reference Strategy

### **When Starting a New Conversation:**

1. **Read First:** PROGRESS_TRACKER.md
   - Get current sprint and status
   - Understand what's in progress
   - Check for blockers

2. **Context:** REFACTORING_PLAN.md (if Sprint 1.5)
   - Understand current phase
   - Get implementation details
   - Check verification status

3. **Verify Decisions:** CryptoMeACoffee_PRD.md
   - Confirm architecture boundaries
   - Validate approach
   - Check feature requirements

### **During Work:**

```
Question: "What should I do next?"
→ Check: PROGRESS_TRACKER.md (Kanban → To Do)

Question: "How do I implement x402-express?"
→ Check: REFACTORING_PLAN.md (Phase 2 → Express Server)

Question: "Should we build custom verification?"
→ Check: CryptoMeACoffee_PRD.md (Architecture Boundaries)

Question: "Why are we using GET not POST?"
→ Check: docs/GET_VS_POST_DECISION.md
```

---

## 🗂️ File Structure Overview

```
CryptoMeACoffee/
├── 📋 PROGRESS_TRACKER.md              ← START HERE (Current status)
├── 🔧 REFACTORING_PLAN.md              ← Detailed implementation guide
├── 📖 CryptoMeACoffee_PRD.md           ← Product requirements & architecture
│
├── 📄 REFACTORING_SUMMARY.md           ← Quick 2-page summary
├── ✅ X402_ALIGNMENT_VERIFICATION.md   ← Verification report
├── 🗺️ DOCUMENTATION_MAP.md             ← This file (navigation guide)
│
├── docs/
│   └── GET_VS_POST_DECISION.md         ← HTTP method decision rationale
│
├── README.md                           ← Public-facing overview
├── TESTING_GUIDE.md                    ← Test instructions
├── LICENSE                             ← MIT license
│
├── src/                                ← Source code
├── server-examples/                    ← Backend examples
├── examples/                           ← Frontend examples
└── assets/                             ← Visual assets
```

---

## ✅ Document Status Summary

| Document | Status | Complete? | Next Update |
|----------|--------|-----------|-------------|
| PROGRESS_TRACKER.md | ✅ Up to date | Sprint 1.5 | Daily during sprint |
| REFACTORING_PLAN.md | ✅ Up to date | Ready | Phase completion |
| CryptoMeACoffee_PRD.md | ✅ Up to date | v1.1.0 | Sprint milestones |
| REFACTORING_SUMMARY.md | ✅ Complete | Static | N/A |
| X402_ALIGNMENT_VERIFICATION.md | ✅ Complete | 98% | Phase 1 completion |
| GET_VS_POST_DECISION.md | ✅ Complete | Static | N/A |
| DOCUMENTATION_MAP.md | ✅ Complete | Current | As needed |
| README.md | 🟡 Needs update | After refactor | Sprint 2 |
| TESTING_GUIDE.md | 🟡 Needs update | After refactor | Sprint 2 |

---

## 🎓 Best Practices for Claude Code

### **Do:**
- ✅ Start every session by reading PROGRESS_TRACKER.md
- ✅ Reference REFACTORING_PLAN.md for implementation details
- ✅ Check PRD for architecture boundary questions
- ✅ Update PROGRESS_TRACKER.md as you complete tasks
- ✅ Mark todos as complete in real-time

### **Don't:**
- ❌ Skip reading PROGRESS_TRACKER.md at session start
- ❌ Implement features without checking PRD boundaries
- ❌ Deviate from REFACTORING_PLAN.md without discussion
- ❌ Create new docs without updating DOCUMENTATION_MAP.md

---

## 📞 Quick Links by Use Case

### **"I'm starting a new session, where do I begin?"**
→ Read: PROGRESS_TRACKER.md (Section: Current Sprint)

### **"What am I supposed to be working on?"**
→ Read: PROGRESS_TRACKER.md (Section: Kanban Board → In Progress)

### **"How do I implement Phase 2 of refactoring?"**
→ Read: REFACTORING_PLAN.md (Section: Phase 2: Refactor Server Examples)

### **"Should we use x402-express or custom code?"**
→ Read: CryptoMeACoffee_PRD.md (Section: Architecture Boundaries)

### **"Is our plan aligned with x402 docs?"**
→ Read: X402_ALIGNMENT_VERIFICATION.md (Section: Overall Alignment Score)

### **"Why are we using GET instead of POST?"**
→ Read: docs/GET_VS_POST_DECISION.md

### **"What are all the available documents?"**
→ Read: DOCUMENTATION_MAP.md (this file)

---

## 🔄 Document Relationships

```
PROGRESS_TRACKER.md
    ↓ (references)
REFACTORING_PLAN.md
    ↓ (implements)
CryptoMeACoffee_PRD.md
    ↓ (verified by)
X402_ALIGNMENT_VERIFICATION.md
    ↓ (decision details)
GET_VS_POST_DECISION.md
```

**Flow:**
1. PRD defines WHAT we build
2. REFACTORING_PLAN defines HOW we build it
3. VERIFICATION confirms alignment with x402
4. PROGRESS_TRACKER tracks execution
5. Decision docs explain specific choices

---

## 🚀 Recommendation for Claude Code

### **Primary Reference (Always Check):**
```
PROGRESS_TRACKER.md
```
This file contains:
- Current sprint and goals
- What's in progress right now
- What's blocking progress
- What's been completed
- What to do next

### **Implementation Guide (For Current Work):**
```
REFACTORING_PLAN.md
```
This file contains:
- Step-by-step instructions
- Code examples (correct vs incorrect)
- Phase-by-phase tasks
- Success criteria

### **Architecture Reference (For Decisions):**
```
CryptoMeACoffee_PRD.md
```
This file contains:
- Architecture boundaries
- What we build vs x402 handles
- Feature requirements
- Success metrics

---

## ✅ Summary: Your Navigation Strategy

**For Daily Work:**
1. **PROGRESS_TRACKER.md** - "What's the current state?"
2. **REFACTORING_PLAN.md** - "How do I do this task?"
3. **CryptoMeACoffee_PRD.md** - "Is this the right approach?"

**For Reference:**
4. Supporting docs as needed for specific questions

**Update Flow:**
- Update PROGRESS_TRACKER.md daily
- Update REFACTORING_PLAN.md per phase
- Update PRD per sprint milestone

---

**Last Updated:** November 19, 2025
**Next Review:** After Sprint 1.5 Completion
