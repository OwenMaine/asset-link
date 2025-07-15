document.addEventListener('DOMContentLoaded', (event) => {
    // --- SUPABASE INITIALIZATION ---
    // Replace with your actual Supabase URL and Key!
    const SUPABASE_URL = 'https://bbteumvixhfvuktdddds.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJidGV1bXZpeGhmdnVrdGRkZGRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTEzOTAsImV4cCI6MjA2ODE2NzM5MH0.8YFvJxTwUHwO-nByKE4BHIzj3MRJ97aOJxtZMEgXPNI';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // --- DOM Element References ---
    const scannerView = document.getElementById('scanner-view');
    const assetView = document.getElementById('asset-view');
    const scanAgainBtn = document.getElementById('scan-again-btn');

    // --- Main Functions ---

    // This function now fetches data from Supabase
    async function onScanSuccess(decodedText) {
        console.log(`Scanned Asset ID = ${decodedText}`);
        html5QrcodeScanner.clear();

        // Fetch the asset from the 'assets' table where asset_id matches the scan
        const { data, error } = await supabase
            .from('assets')
            .select('*')
            .eq('asset_id', decodedText)
            .single(); // .single() gets one record instead of an array

        displayAsset(data, error, decodedText);
    }

    // New function to display asset data and handle UI updates
    function displayAsset(asset, error, scannedId) {
        scannerView.classList.add('hidden');
        assetView.classList.remove('hidden');
        scanAgainBtn.classList.remove('hidden');

        if (error || !asset) {
            console.error('Error fetching asset:', error);
            assetView.innerHTML = `<div class="asset-card"><h3>Asset Not Found</h3><p>ID <strong>${scannedId}</strong> not in the system.</p></div>`;
            return;
        }

        const isCheckedOut = asset.status === 'Checked Out';
        assetView.innerHTML = `
            <div class="asset-card">
                <h3>${asset.name}</h3>
                <p>Asset ID: <strong>${asset.asset_id}</strong></p>
                <p>Checked Out By: <strong>${asset.checked_out_by || 'N/A'}</strong></p>
                <div class="asset-status ${isCheckedOut ? 'checked-out' : 'available'}">${asset.status}</div>
                <div class="asset-actions">
                    ${!isCheckedOut ? `<button class="btn-check-out" data-id="${asset.asset_id}">Check Out</button>` : ''}
                    ${isCheckedOut ? `<button class="btn-check-in" data-id="${asset.asset_id}">Check In</button>` : ''}
                </div>
            </div>`;
    }

    // This function updates the asset status in Supabase
    async function updateAssetStatus(assetId, checkOut) {
        const newStatus = checkOut ? 'Checked Out' : 'Available';
        const checkedOutBy = checkOut ? prompt("Please enter your name to check out:") : null;

        if (checkOut && !checkedOutBy) return; // User cancelled the prompt

        const { data, error } = await supabase
            .from('assets')
            .update({ status: newStatus, checked_out_by: checkedOutBy })
            .eq('asset_id', assetId)
            .select()
            .single();

        displayAsset(data, error, assetId); // Re-render the card with new data
    }

    // --- Event Delegation for Check In/Out Buttons ---
    assetView.addEventListener('click', (e) => {
        const assetId = e.target.dataset.id;
        if (!assetId) return;

        if (e.target.classList.contains('btn-check-out')) {
            updateAssetStatus(assetId, true); // true = checking out
        } else if (e.target.classList.contains('btn-check-in')) {
            updateAssetStatus(assetId, false); // false = checking in
        }
    });

    // --- Scanner Initialization ---
    let html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false);

    function startScanner() {
        scannerView.classList.remove('hidden');
        assetView.classList.add('hidden');
        scanAgainBtn.classList.add('hidden');
        html5QrcodeScanner.render(onScanSuccess, () => {});
    }
    
    scanAgainBtn.addEventListener('click', startScanner);

    startScanner(); // Initial start
});