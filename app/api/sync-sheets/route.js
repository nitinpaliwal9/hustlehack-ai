import { syncGoogleSheetsToSupabase } from '../../../scripts/sync-google-sheets-to-supabase.js';

export async function POST(req) {
  try {
    // Optional: Add authentication check
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Trigger the sync
    const result = await syncGoogleSheetsToSupabase();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Sync completed successfully',
      result
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Sync API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// GET endpoint for manual trigger (for testing)
export async function GET(req) {
  try {
    const result = await syncGoogleSheetsToSupabase();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Sync completed successfully',
      result
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Sync API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 