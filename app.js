function generatePanchang() {
  const selectedDate = document.getElementById("pdate").value;
  if (!selectedDate) {
    alert("దయచేసి తేదీ ఎంచుకోండి.");
    return;
  }

  const date = new Date(selectedDate);
  const p = calculate(date);

  document.getElementById("day").textContent = toTeluguWeek(p.Vaara);
  document.getElementById("tithi").textContent = `${toTeluguTithi(p.Tithi)} (ప్రారంభం: ${p.Tithi_Start}, ముగింపు: ${p.Tithi_End})`;
  document.getElementById("nakshatra").textContent = `${toTeluguNakshatra(p.Nakshatra)} (ప్రారంభం: ${p.Nakshatra_Start}, ముగింపు: ${p.Nakshatra_End})`;
  document.getElementById("yoga").textContent = `${toTeluguYoga(p.Yoga)} (ప్రారంభం: ${p.Yoga_Start}, ముగింపు: ${p.Yoga_End})`;
  document.getElementById("karana").textContent = `${toTeluguKarana(p.Karana)} (ప్రారంభం: ${p.Karana_Start}, ముగింపు: ${p.Karana_End})`;

  document.getElementById("panchang-output").style.display = "block";
}

// Telugu mappings
function toTeluguWeek(day) {
  const map = {
    "Sunday": "ఆదివారం",
    "Monday": "సోమవారం",
    "Tuesday": "మంగళవారం",
    "Wednesday": "బుధవారం",
    "Thursday": "గురువారం",
    "Friday": "శుక్రవారం",
    "Saturday": "శనివారం"
  };
  return map[day] || day;
}

function toTeluguTithi(tithi) {
  const map = {
    "Padyami": "పాడ్యమి", "Vidhiya": "విదియ", "Thadiya": "తదియ", "Chavithi": "చవితి",
    "Panchami": "పంచమి", "Shasti": "షష్ఠి", "Sapthami": "సప్తమి", "Ashtami": "అష్టమి",
    "Navami": "నవమి", "Dasami": "దశమి", "Ekadasi": "ఏకాదశి", "Dvadasi": "ద్వాదశి",
    "Trayodasi": "త్రయోదశి", "Chaturdasi": "చతుర్దశి", "Punnami": "పూర్ణిమ", "Amavasya": "అమావాస్య"
  };
  return map[tithi] || tithi;
}

function toTeluguNakshatra(nak) {
  return nak.replace(/Shada/, "షాఢ").replace(/Sravanam/, "శ్రవణం").replace(/Revathi/, "రేవతి").replace(/[^ ]+/g, s => s);
}

function toTeluguYoga(yoga) {
  return yoga.replace(/[^ ]+/g, s => s); // keep original
}

function toTeluguKarana(karana) {
  return karana.replace(/[^ ]+/g, s => s); // keep original
}
