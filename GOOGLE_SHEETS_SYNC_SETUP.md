# Google Sheets to Supabase Sync Setup

This setup allows you to automatically sync new Google Sheets data to Supabase **without modifying your existing Apps Script**.

## 🎯 **How It Works**

1. **Your existing Apps Script** continues to work perfectly
2. **New sync script** runs every 5 minutes to check for new rows in Google Sheets
3. **Automatically updates Supabase** with new payment data
4. **No changes needed** to your current workflow

## 📋 **Setup Steps**

### **Step 1: Install Dependencies**

```bash
npm install googleapis dotenv
```

### **Step 2: Create Google Service Account**

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** or select existing one
3. **Enable Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. **Create Service Account**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in details and click "Create"
5. **Generate JSON Key**:
   - Click on your service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key" → "JSON"
   - Download the JSON file

### **Step 3: Share Google Sheet**

1. **Open your Google Sheet**
2. **Click "Share"** (top right)
3. **Add your service account email** (from the JSON file)
4. **Give "Editor" access**

### **Step 4: Environment Variables**

Add these to your `.env.local`:

```bash
# Supabase (you already have these)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Sheets Sync
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
```

### **Step 5: Configure Sheet Structure**

Make sure your Google Sheet has these columns (adjust the script if different):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Payment ID | Email | Plan | Amount | Currency | Status | Payment Method | Source |

### **Step 6: Test the Sync**

#### **Option A: Manual Test**
```bash
# Run the sync script directly
node scripts/sync-google-sheets-to-supabase.js
```

#### **Option B: API Test**
```bash
# Call the API endpoint
curl http://localhost:3000/api/sync-sheets
```

## 🔄 **Automation Options**

### **Option 1: Cron Job (Recommended)**

Add to your server's crontab:

```bash
# Run every 5 minutes
*/5 * * * * cd /path/to/your/project && node scripts/sync-google-sheets-to-supabase.js >> sync.log 2>&1
```

### **Option 2: Vercel Cron (if using Vercel)**

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/sync-sheets",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

### **Option 3: GitHub Actions**

Create `.github/workflows/sync.yml`:

```yaml
name: Sync Google Sheets to Supabase

on:
  schedule:
    - cron: '*/5 * * * *'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node scripts/sync-google-sheets-to-supabase.js
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          GOOGLE_SHEET_ID: ${{ secrets.GOOGLE_SHEET_ID }}
          GOOGLE_SERVICE_ACCOUNT_EMAIL: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_EMAIL }}
          GOOGLE_PRIVATE_KEY: ${{ secrets.GOOGLE_PRIVATE_KEY }}
```

## 🎯 **How It Works**

### **Sync Process:**

1. **Reads last sync timestamp** from local file
2. **Fetches all rows** from Google Sheets
3. **Filters new rows** (after last sync timestamp)
4. **Checks for duplicates** in Supabase
5. **Creates/updates users** in Supabase
6. **Inserts payment records** in Supabase
7. **Updates user plans** if needed
8. **Updates sync timestamp**

### **Duplicate Prevention:**

- ✅ **Payment ID check**: Won't insert same payment twice
- ✅ **Timestamp tracking**: Only processes new rows
- ✅ **Error handling**: Continues on individual failures

### **User Management:**

- ✅ **Auto-create users**: If email doesn't exist
- ✅ **Plan updates**: Upgrades users to better plans
- ✅ **Expiry calculation**: Smart plan expiry logic

## 🔧 **Customization**

### **Adjust Sync Interval**

Edit `CONFIG.SYNC_INTERVAL_MINUTES` in the script:

```javascript
const CONFIG = {
  // ... other config
  SYNC_INTERVAL_MINUTES: 10, // Change to 10 minutes
};
```

### **Custom Sheet Structure**

If your sheet has different columns, update the mapping in `fetchNewPaymentsFromSheets`:

```javascript
payments.push({
  timestamp: row[0],      // Column A
  payment_id: row[1],     // Column B
  email: row[2],          // Column C
  plan: row[3],           // Column D
  amount: parseFloat(row[4]), // Column E
  currency: row[5],       // Column F
  status: row[6],         // Column G
  payment_method: row[7], // Column H
  source: row[8] || 'Google Sheets Sync' // Column I
});
```

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **1. "Service account not found"**
- ✅ Check service account email in environment variables
- ✅ Make sure you shared the sheet with the service account

#### **2. "Sheet not accessible"**
- ✅ Verify `GOOGLE_SHEET_ID` is correct
- ✅ Check sheet sharing permissions

#### **3. "Supabase connection failed"**
- ✅ Verify Supabase URL and key
- ✅ Check network connectivity

#### **4. "No new payments found"**
- ✅ Check if sheet has new rows after last sync
- ✅ Verify timestamp column format

### **Debug Mode:**

Add this to see detailed logs:

```javascript
// In the script, add:
console.log('🔍 Debug: Last sync:', lastSync);
console.log('🔍 Debug: Found payments:', payments.length);
```

## ✅ **Benefits**

### **✅ Zero Disruption:**
- Your existing Apps Script continues unchanged
- No modifications to current workflow
- Seamless integration

### **✅ Real-time Sync:**
- New payments appear in Supabase within 5 minutes
- Automatic user creation and plan updates
- Duplicate prevention

### **✅ Scalable:**
- Handles multiple payment sources
- Robust error handling
- Easy to maintain

### **✅ Cost-effective:**
- No additional services needed
- Uses existing infrastructure
- Minimal resource usage

## 🎉 **You're All Set!**

Your Google Sheets will now automatically sync to Supabase every 5 minutes, keeping your data consistent across both systems without any changes to your existing Apps Script! 