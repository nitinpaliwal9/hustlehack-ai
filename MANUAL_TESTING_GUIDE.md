# Manual Testing Guide: Google Sheets → Supabase

This guide will help you test the sync system by manually adding data to Google Sheets and verifying it appears in Supabase.

## 🎯 **Testing Overview**

### **What We'll Test:**
1. ✅ **Add test data** to Google Sheets manually
2. ✅ **Run sync script** to process the data
3. ✅ **Verify data appears** in Supabase
4. ✅ **Check user creation** and plan updates

---

## **📋 STEP-BY-STEP TESTING**

### **Step 1: Prepare Your Environment**

#### **1.1 Check Environment Variables**
```bash
node scripts/test-env.js
```

**Expected Output:**
```
✅ NEXT_PUBLIC_SUPABASE_URL: Set
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set
✅ GOOGLE_SHEET_ID: Set
✅ GOOGLE_SERVICE_ACCOUNT_EMAIL: Set
✅ GOOGLE_PRIVATE_KEY: Set
```

#### **1.2 Test Connections**
```bash
node scripts/test-with-env.js
```

**Expected Output:**
```
✅ Supabase connection successful!
✅ Google Sheets connection successful!
```

### **Step 2: Manual Data Addition**

#### **Option A: Automated Test (Recommended)**
```bash
node scripts/test-manual-sync.js
```

This script will:
- ✅ Add test data to Google Sheets automatically
- ✅ Run the sync script
- ✅ Verify data appears in Supabase
- ✅ Show detailed results

#### **Option B: Manual Addition**

**2.1 Add Data to Google Sheets Manually:**
1. **Open your Google Sheet**
2. **Add a new row** with this test data:

| A (Timestamp) | B (Payment ID) | C (Email) | D (Plan) | E (Amount) | F (Currency) | G (Status) | H (Method) | I (Source) |
|---------------|----------------|-----------|----------|------------|--------------|------------|------------|------------|
| `2024-01-15T10:30:00.000Z` | `test_1234567890` | `test@example.com` | `starter` | `99` | `INR` | `completed` | `Test Payment` | `Manual Test` |

**2.2 Run Sync Script:**
```bash
node scripts/sync-google-sheets-to-supabase.js
```

**2.3 Check Supabase:**
- Go to your Supabase dashboard
- Check the `payments` table for the test payment
- Check the `users` table for the test user

### **Step 3: Verification**

#### **3.1 Check Payments Table**
```sql
-- Run this in Supabase SQL Editor
SELECT * FROM payments 
WHERE payment_intent_id = 'test_1234567890';
```

**Expected Result:**
```json
{
  "id": "uuid",
  "user_id": "user_uuid",
  "plan_id": "starter",
  "amount": 99,
  "currency": "INR",
  "status": "completed",
  "payment_intent_id": "test_1234567890",
  "payment_method": "Test Payment",
  "gateway_response": {"source": "Google Sheets Sync"},
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

#### **3.2 Check Users Table**
```sql
-- Run this in Supabase SQL Editor
SELECT * FROM users 
WHERE email = 'test@example.com';
```

**Expected Result:**
```json
{
  "id": "user_uuid",
  "email": "test@example.com",
  "plan": "starter",
  "plan_start": "2024-01-15T10:30:00.000Z",
  "plan_expiry": "2024-02-14T10:30:00.000Z",
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

---

## **🧪 TESTING SCENARIOS**

### **Scenario 1: New User Payment**
**Test Data:**
```json
{
  "email": "newuser@example.com",
  "payment_id": "test_new_user_123",
  "plan": "creator",
  "amount": 199
}
```

**Expected Results:**
- ✅ New user created in Supabase
- ✅ Payment record added
- ✅ User plan set to "creator"
- ✅ Plan expiry set to 30 days from now

### **Scenario 2: Existing User Payment**
**Test Data:**
```json
{
  "email": "existing@example.com", // Use an existing email
  "payment_id": "test_existing_user_456",
  "plan": "pro",
  "amount": 299
}
```

**Expected Results:**
- ✅ User plan updated to "pro"
- ✅ Plan expiry extended
- ✅ Payment record added
- ✅ No duplicate user created

### **Scenario 3: Same Plan Renewal**
**Test Data:**
```json
{
  "email": "renewal@example.com",
  "payment_id": "test_renewal_789",
  "plan": "starter", // Same plan as existing
  "amount": 99
}
```

**Expected Results:**
- ✅ Plan expiry extended by 30 days
- ✅ Payment record added
- ✅ User plan remains "starter"

---

## **🔍 TROUBLESHOOTING**

### **Issue 1: "Service account not found"**
**Solution:**
1. Check your Google Service Account email
2. Make sure you shared the sheet with the service account
3. Verify the service account has "Editor" access

### **Issue 2: "Sheet not accessible"**
**Solution:**
1. Verify your `GOOGLE_SHEET_ID` is correct
2. Check sheet sharing permissions
3. Ensure the service account has access

### **Issue 3: "Supabase connection failed"**
**Solution:**
1. Check your Supabase URL and key
2. Verify your Supabase project is active
3. Check network connectivity

### **Issue 4: "Data not syncing"**
**Solution:**
1. Check the sync script logs
2. Verify the sheet structure matches expected format
3. Check for duplicate payment IDs
4. Ensure timestamp format is correct

---

## **📊 MONITORING THE SYNC**

### **Check Sync Logs**
```bash
# Run sync with verbose logging
node scripts/sync-google-sheets-to-supabase.js
```

**Expected Output:**
```
🔄 Starting Google Sheets to Supabase sync...
📊 Found 1 new payments to sync
✅ Payment processed: test_1234567890
✅ User updated: test@example.com
✅ Sync completed successfully
```

### **Check API Endpoint**
```bash
# Test the API endpoint
curl http://localhost:3000/api/sync-sheets
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Sync completed successfully",
  "result": {
    "processed": 1,
    "skipped": 0,
    "errors": 0
  }
}
```

---

## **🎯 SUCCESS CRITERIA**

### **✅ Test Passes If:**
1. **Data appears in Supabase** within 5 minutes
2. **User record is created/updated** correctly
3. **Payment record is added** with correct details
4. **Plan expiry is calculated** correctly
5. **No duplicate records** are created
6. **Error handling works** for invalid data

### **✅ Automation Works If:**
1. **Cron job runs** every 5 minutes
2. **New payments sync** automatically
3. **Legacy payments sync** on first run
4. **Email mismatches** are handled correctly
5. **Duplicate prevention** works reliably

---

## **🚀 NEXT STEPS**

### **After Successful Testing:**
1. **Set up automation** (cron, Vercel, or GitHub Actions)
2. **Monitor logs** for any issues
3. **Test with real payment data**
4. **Scale as needed**

### **Production Deployment:**
1. **Remove test data** from Google Sheets
2. **Set up proper monitoring**
3. **Configure alerts** for sync failures
4. **Document the process** for your team

---

## **🎉 SUCCESS!**

Once you've completed these tests successfully, your Google Sheets to Supabase sync system is working correctly and ready for production use! 