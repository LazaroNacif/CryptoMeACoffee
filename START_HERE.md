# 🚀 START HERE - Quick Reference for Claude Code

**Last Updated:** November 19, 2025

---

## 📋 Primary References (Check These First)

### **1. PROGRESS_TRACKER.md** ⭐ MOST IMPORTANT
**What:** Current sprint status, tasks, blockers
**When:** Every session start
**Contains:**
- Current sprint: Sprint 1.5 - x402 Refactoring (Nov 19-21)
- Kanban board (To Do → In Progress → Done)
- Blockers and issues
- Daily goals

**Quick Check:**
```markdown
Current Sprint: Sprint 1.5 - x402 Protocol Compliance
Sprint Status: 🔴 Not Started
Sprint Goal: Refactor to properly use x402-express
```

---

### **2. REFACTORING_PLAN.md** ⭐ IMPLEMENTATION GUIDE
**What:** Step-by-step refactoring instructions
**When:** During Sprint 1.5 (current sprint)
**Contains:**
- Phase 1: Install & Configure (Day 1)
- Phase 2: Refactor Servers (Day 2)
- Phase 3: Update Widget & Docs (Day 3)
- Code examples (correct vs incorrect)

**Quick Check:**
```markdown
✅ Verified against official x402 docs (98% alignment)
✅ Using GET (not POST) per official patterns
✅ Using x402-express middleware (not custom code)
```

---

### **3. CryptoMeACoffee_PRD.md** ⭐ ARCHITECTURE REFERENCE
**What:** Product requirements & architecture boundaries
**When:** Before making architecture decisions
**Contains:**
- What we build vs what x402 handles (CRITICAL!)
- Feature requirements
- Success criteria

**Quick Check:**
```markdown
OUR RESPONSIBILITY:
  ✅ Widget UI/UX
  ✅ Integration examples
  ✅ Documentation

x402 RESPONSIBILITY:
  ✅ Payment verification
  ✅ Signature validation
  ✅ Blockchain settlement
```

---

## 🎯 Quick Decision Tree

```
Question: "What should I work on?"
→ Answer: Check PROGRESS_TRACKER.md (Kanban → To Do)

Question: "How do I implement this?"
→ Answer: Check REFACTORING_PLAN.md (Phase 1/2/3)

Question: "Should we build this feature?"
→ Answer: Check CryptoMeACoffee_PRD.md (Architecture Boundaries)

Question: "Is this approach correct?"
→ Answer: Check X402_ALIGNMENT_VERIFICATION.md (98% alignment)

Question: "Why are we using GET not POST?"
→ Answer: Check docs/GET_VS_POST_DECISION.md
```

---

## 🔢 Session Start Routine

### **Step 1: Read PROGRESS_TRACKER.md**
```bash
# Check:
- Current sprint status
- Tasks in "In Progress"
- Any blockers
- Today's goals
```

### **Step 2: Read REFACTORING_PLAN.md (if working on Sprint 1.5)**
```bash
# Check:
- Current phase (1, 2, or 3)
- Specific tasks for this phase
- Success criteria
```

### **Step 3: Verify Architecture (if unsure)**
```bash
# Check PRD:
- Architecture boundaries
- What we should/shouldn't build
```

---

## 📂 All Documents at a Glance

| Document | Purpose | Priority |
|----------|---------|----------|
| **PROGRESS_TRACKER.md** | Current status, tasks, blockers | ⭐⭐⭐ ALWAYS |
| **REFACTORING_PLAN.md** | Step-by-step implementation | ⭐⭐⭐ CURRENT |
| **CryptoMeACoffee_PRD.md** | Requirements, architecture | ⭐⭐ REFERENCE |
| REFACTORING_SUMMARY.md | 2-page overview | ⭐ QUICK REF |
| X402_ALIGNMENT_VERIFICATION.md | Alignment proof | ⭐ REFERENCE |
| DOCUMENTATION_MAP.md | Navigation guide | ⭐ NAVIGATION |
| docs/GET_VS_POST_DECISION.md | HTTP method rationale | DETAIL |

---

## ✅ Key Principles (Never Forget)

### **Architecture Boundaries:**
```
❌ DON'T BUILD: Payment verification (x402 handles this)
❌ DON'BUILD: Signature validation (x402 handles this)
✅ DO BUILD: Widget UI/UX (our value-add)
✅ DO BUILD: Integration examples (our value-add)
```

### **Follow Official Patterns:**
```
✅ Use x402-express (not custom middleware)
✅ Use GET (not POST) - matches official docs
✅ Use official facilitator URLs
✅ Match official configuration format
```

### **Update Progress:**
```
✅ Mark todos in TodoWrite tool
✅ Update PROGRESS_TRACKER.md daily
✅ Document learnings in Learning Log
```

---

## 🚨 Current Sprint Summary

**Sprint 1.5: x402 Protocol Compliance**
- **Dates:** Nov 19-21 (3 days)
- **Goal:** Refactor to properly use x402-express
- **Status:** 🔴 Not Started

**Why Refactoring:**
- We built custom verification (wrong)
- Should use x402-express (correct)
- See REFACTORING_PLAN.md for details

**3 Phases:**
1. Install & configure x402 packages
2. Refactor server examples
3. Update widget & documentation

---

## 📞 Need More Detail?

**Full navigation guide:** DOCUMENTATION_MAP.md
**Complete refactoring plan:** REFACTORING_PLAN.md
**Product requirements:** CryptoMeACoffee_PRD.md
**Current progress:** PROGRESS_TRACKER.md

---

**TL;DR: Always start with PROGRESS_TRACKER.md** 🎯
