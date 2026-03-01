async function fetchRC(){
  const rc = document.getElementById("rcInput").value.trim().toUpperCase();
  const result = document.getElementById("result");
  const loading = document.getElementById("loading");

  if(!rc){
    result.innerHTML = "❌ Please enter RC number";
    return;
  }

  result.innerHTML = "";
  loading.innerText = "🔎 Fetching details...";

  try{
    const res = await fetch(`https://vehicle-eight-vert.vercel.app/api?rc=${encodeURIComponent(rc)}`);
    const data = await res.json();

    if(!data.details){
      loading.innerText = "";
      result.innerHTML = "❌ No data found";
      return;
    }

    const d = data.details;

    loading.innerText = "";
    result.innerHTML = `
      <b>🚗 Vehicle Information</b><br><br>
      🪪 RC: ${data.rc}<br>
      👤 Owner: ${d["Owner Name"] || "N/A"}<br>
      🏍️ Model: ${d["Maker Model"] || "N/A"}<br>
      ⛽ Fuel: ${d["Fuel Type"] || "N/A"}<br>
      🏛️ RTO: ${d["Registered RTO"] || "N/A"}<br>
    `;

  }catch(err){
    loading.innerText = "";
    result.innerHTML = "❌ API Error";
  }
}