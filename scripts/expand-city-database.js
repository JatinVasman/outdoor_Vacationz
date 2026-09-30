const fs = require('fs');
const path = require('path');

const seoDir = path.join(__dirname, '..', 'SEO');
if (!fs.existsSync(seoDir)) {
  fs.mkdirSync(seoDir, { recursive: true });
}

// Load existing base
const baseScript = require('./build-india-city-database.js');

// Read current generated json directly from client data
const clientJsonPath = path.join(__dirname, '..', 'client', 'src', 'data', 'indiaCityDatabase.json');
const currentCities = JSON.parse(fs.readFileSync(clientJsonPath, 'utf8'));

// Additional deep coverage across all states to exceed 450+ cities
const additionalStatesCoverage = [
  {
    state: 'Puducherry',
    stateSlug: 'puducherry',
    region: 'South India',
    cities: [
      { name: 'Puducherry (Pondicherry)', tier: 'Tier 2', airport: 'Puducherry Airport (PNY)', airportCode: 'PNY', rail: ['Puducherry (PDY)'], indexable: true },
      { name: 'Karaikal', tier: 'Tier 3', airport: 'Trichy Airport (135 km)', airportCode: 'TRZ', rail: ['Karaikal (KIK)'] },
      { name: 'Mahe', tier: 'Tier 3', airport: 'Kannur Airport (35 km)', airportCode: 'CNN', rail: ['Mahe (MAHE)'] },
      { name: 'Yanam', tier: 'Tier 3', airport: 'Rajahmundry Airport (65 km)', airportCode: 'RJA', rail: ['Kakinada Town (25 km)'] }
    ]
  },
  {
    state: 'Andaman and Nicobar Islands',
    stateSlug: 'andaman-nicobar',
    region: 'South India',
    cities: [
      { name: 'Port Blair (Sri Vijaya Puram)', tier: 'Tier 2', airport: 'Veer Savarkar International Airport', airportCode: 'IXZ', rail: ['Chennai / Kolkata Port'], indexable: true },
      { name: 'Havelock Island (Swaraj Dweep)', tier: 'Tier 3', airport: 'Port Blair Airport (55 km via ferry)', airportCode: 'IXZ', rail: ['Ferry Jetty'] },
      { name: 'Neil Island (Shaheed Dweep)', tier: 'Tier 3', airport: 'Port Blair Airport via ferry', airportCode: 'IXZ', rail: ['Ferry Jetty'] }
    ]
  },
  {
    state: 'Dadra and Nagar Haveli and Daman and Diu',
    stateSlug: 'daman-diu-dadra',
    region: 'West India',
    cities: [
      { name: 'Daman', tier: 'Tier 2', airport: 'Daman Airport (Surat 100 km / BOM 160 km)', airportCode: 'STV', rail: ['Vapi (12 km)'], indexable: true },
      { name: 'Silvassa', tier: 'Tier 2', airport: 'Surat (120 km) / Mumbai (160 km)', airportCode: 'BOM', rail: ['Vapi (18 km)'], indexable: true },
      { name: 'Diu', tier: 'Tier 3', airport: 'Diu Airport', airportCode: 'DIU', rail: ['Delvada (10 km)'] }
    ]
  },
  {
    state: 'Uttar Pradesh',
    stateSlug: 'uttar-pradesh',
    region: 'North India',
    cities: [
      { name: 'Faizabad', tier: 'Tier 2', airport: 'Ayodhya Airport (AYJ)', airportCode: 'AYJ', rail: ['Ayodhya Cantt (AYC)'], indexable: true },
      { name: 'Basti', tier: 'Tier 3', airport: 'Gorakhpur Airport (70 km)', airportCode: 'GOP', rail: ['Basti (BST)'] },
      { name: 'Gonda', tier: 'Tier 3', airport: 'Ayodhya Airport (50 km)', airportCode: 'AYJ', rail: ['Gonda Jn (GD)'] },
      { name: 'Azamgarh', tier: 'Tier 3', airport: 'Varanasi Airport (90 km)', airportCode: 'VNS', rail: ['Azamgarh (AMH)'] },
      { name: 'Deoria', tier: 'Tier 3', airport: 'Gorakhpur Airport (50 km)', airportCode: 'GOP', rail: ['Deoria Sadar (DEOS)'] },
      { name: 'Ghazipur', tier: 'Tier 3', airport: 'Varanasi Airport (75 km)', airportCode: 'VNS', rail: ['Ghazipur City (GCT)'] },
      { name: 'Ballia', tier: 'Tier 3', airport: 'Patna Airport (140 km) / Varanasi', airportCode: 'PAT', rail: ['Ballia (BUI)'] },
      { name: 'Sultanpur', tier: 'Tier 3', airport: 'Ayodhya / Lucknow Airport', airportCode: 'AYJ', rail: ['Sultanpur Jn (SLN)'] },
      { name: 'Unnao', tier: 'Tier 3', airport: 'Kanpur / Lucknow Airport', airportCode: 'LKO', rail: ['Unnao Jn (ON)'] },
      { name: 'Hardoi', tier: 'Tier 3', airport: 'Lucknow Airport (110 km)', airportCode: 'LKO', rail: ['Hardoi (HRI)'] },
      { name: 'Bijnor', tier: 'Tier 3', airport: 'Jolly Grant Dehradun (95 km)', airportCode: 'DED', rail: ['Bijnor (BJO)'] },
      { name: 'Orai', tier: 'Tier 3', airport: 'Kanpur Airport (115 km)', airportCode: 'KNU', rail: ['Orai (ORAI)'] },
      { name: 'Lalitpur', tier: 'Tier 3', airport: 'Bhopal / Gwalior Airport', airportCode: 'BHO', rail: ['Lalitpur Jn (LAR)'] },
      { name: 'Mainpuri', tier: 'Tier 3', airport: 'Agra Airport (115 km)', airportCode: 'AGR', rail: ['Mainpuri (MNQ)'] },
      { name: 'Kasganj', tier: 'Tier 3', airport: 'Aligarh / Agra Airport', airportCode: 'AGR', rail: ['Kasganj Jn (KSJ)'] }
    ]
  },
  {
    state: 'Maharashtra',
    stateSlug: 'maharashtra',
    region: 'West India',
    cities: [
      { name: 'Yavatmal', tier: 'Tier 3', airport: 'Nagpur Airport (145 km)', airportCode: 'NAG', rail: ['Dhamangaon (45 km)'] },
      { name: 'Buldhana', tier: 'Tier 3', airport: 'Aurangabad / Jalgaon Airport', airportCode: 'IXU', rail: ['Malkapur (45 km)'] },
      { name: 'Dharashiv (Osmanabad)', tier: 'Tier 3', airport: 'Solapur Airport (70 km)', airportCode: 'SSE', rail: ['Osmanabad (UMD)'] },
      { name: 'Beed', tier: 'Tier 3', airport: 'Aurangabad Airport (125 km)', airportCode: 'IXU', rail: ['Parli Vaijnath (90 km)'] },
      { name: 'Washim', tier: 'Tier 3', airport: 'Akola Airport (80 km)', airportCode: 'AKD', rail: ['Washim (WHM)'] },
      { name: 'Hingoli', tier: 'Tier 3', airport: 'Nanded Airport (80 km)', airportCode: 'NDC', rail: ['Hingoli Deccan (HNL)'] },
      { name: 'Bhandara', tier: 'Tier 3', airport: 'Nagpur Airport (65 km)', airportCode: 'NAG', rail: ['Bhandara Road (BRD)'] },
      { name: 'Gadchiroli', tier: 'Tier 3', airport: 'Nagpur Airport (180 km)', airportCode: 'NAG', rail: ['Wadsa (50 km)'] },
      { name: 'Alibag', tier: 'Tier 3', airport: 'BOM Airport (100 km)', airportCode: 'BOM', rail: ['Pen (30 km)'] },
      { name: 'Chiplun', tier: 'Tier 3', airport: 'BOM / Kolhapur Airport', airportCode: 'BOM', rail: ['Chiplun (CHI)'] },
      { name: 'Karad', tier: 'Tier 3', airport: 'Kolhapur Airport (75 km)', airportCode: 'KLH', rail: ['Karad (KRD)'] },
      { name: 'Pandharpur', tier: 'Tier 3', airport: 'Solapur Airport (70 km)', airportCode: 'SSE', rail: ['Pandharpur (PVR)'] },
      { name: 'Baramati', tier: 'Tier 3', airport: 'Pune Airport (100 km)', airportCode: 'PNQ', rail: ['Baramati (BRMT)'] },
      { name: 'Shirdi', tier: 'Tier 2', airport: 'Shirdi International Airport (SAG)', airportCode: 'SAG', rail: ['Sainagar Shirdi (SNSI)'], indexable: true }
    ]
  },
  {
    state: 'Karnataka',
    stateSlug: 'karnataka',
    region: 'South India',
    cities: [
      { name: 'Karwar', tier: 'Tier 3', airport: 'Goa Mopa (95 km) / Dabolim', airportCode: 'GOI', rail: ['Karwar (KAWR)'] },
      { name: 'Gokarna', tier: 'Tier 3', airport: 'Goa Dabolim Airport (140 km)', airportCode: 'GOI', rail: ['Gokarna Road (GOK)'] },
      { name: 'Sirsi', tier: 'Tier 3', airport: 'Hubballi Airport (100 km)', airportCode: 'HBX', rail: ['Talguppa (55 km)'] },
      { name: 'Dandeli', tier: 'Tier 3', airport: 'Hubballi Airport (75 km)', airportCode: 'HBX', rail: ['Alnavar Jn (32 km)'] },
      { name: 'Haveri', tier: 'Tier 3', airport: 'Hubballi Airport (75 km)', airportCode: 'HBX', rail: ['Haveri (HVR)'] },
      { name: 'Ranebennur', tier: 'Tier 3', airport: 'Hubballi Airport (110 km)', airportCode: 'HBX', rail: ['Rani Bennur (RNR)'] },
      { name: 'Bagalkot', tier: 'Tier 3', airport: 'Belagavi / Hubballi Airport', airportCode: 'IXG', rail: ['Bagalkot (BGK)'] },
      { name: 'Raichur', tier: 'Tier 3', airport: 'Hyderabad Airport (200 km)', airportCode: 'HYD', rail: ['Raichur Jn (RC)'] },
      { name: 'Koppal', tier: 'Tier 3', airport: 'Jindal Airport (65 km)', airportCode: 'VDY', rail: ['Koppal (KBL)'] },
      { name: 'Gangavathi', tier: 'Tier 3', airport: 'Jindal Airport (55 km)', airportCode: 'VDY', rail: ['Gangavathi (GGVT)'] },
      { name: 'Chikkaballapur', tier: 'Tier 3', airport: 'Kempegowda BLR Airport (30 km)', airportCode: 'BLR', rail: ['Chikkaballapur (CBP)'] },
      { name: 'Ramanagara', tier: 'Tier 3', airport: 'BLR Airport (85 km)', airportCode: 'BLR', rail: ['Ramanagaram (RMGM)'] },
      { name: 'Channapatna', tier: 'Tier 3', airport: 'BLR Airport (95 km)', airportCode: 'BLR', rail: ['Channapatna (CPT)'] },
      { name: 'Kanakapura', tier: 'Tier 3', airport: 'BLR Airport (90 km)', airportCode: 'BLR', rail: ['Bengaluru (55 km)'] },
      { name: 'Kundapura', tier: 'Tier 3', airport: 'Mangaluru Airport (90 km)', airportCode: 'IXE', rail: ['Kundapura (KUDA)'] },
      { name: 'Karkala', tier: 'Tier 3', airport: 'Mangaluru Airport (40 km)', airportCode: 'IXE', rail: ['Mangaluru'] },
      { name: 'Puttur', tier: 'Tier 3', airport: 'Mangaluru Airport (52 km)', airportCode: 'IXE', rail: ['Kabakaputtur (KBPR)'] }
    ]
  },
  {
    state: 'Tamil Nadu',
    stateSlug: 'tamil-nadu',
    region: 'South India',
    cities: [
      { name: 'Pollachi', tier: 'Tier 3', airport: 'Coimbatore Airport (45 km)', airportCode: 'CJB', rail: ['Pollachi Jn (POY)'] },
      { name: 'Mettupalayam', tier: 'Tier 3', airport: 'Coimbatore Airport (38 km)', airportCode: 'CJB', rail: ['Mettupalayam (MTP)'] },
      { name: 'Kodaikanal', tier: 'Tier 3', airport: 'Madurai Airport (130 km)', airportCode: 'IXM', rail: ['Kodai Road (80 km)'] },
      { name: 'Palani', tier: 'Tier 3', airport: 'Coimbatore Airport (100 km)', airportCode: 'CJB', rail: ['Palani (PLNI)'] },
      { name: 'Theni', tier: 'Tier 3', airport: 'Madurai Airport (75 km)', airportCode: 'IXM', rail: ['Theni (TENI)'] },
      { name: 'Rajapalayam', tier: 'Tier 3', airport: 'Madurai Airport (85 km)', airportCode: 'IXM', rail: ['Rajapalayam (RJPM)'] },
      { name: 'Tenkasi', tier: 'Tier 3', airport: 'Tuticorin (85 km) / Trivandrum', airportCode: 'TCR', rail: ['Tenkasi Jn (TSI)'] },
      { name: 'Kovilpatti', tier: 'Tier 3', airport: 'Tuticorin Airport (55 km)', airportCode: 'TCR', rail: ['Kovilpatti (CVP)'] },
      { name: 'Rameswaram', tier: 'Tier 2', airport: 'Madurai Airport (175 km)', airportCode: 'IXM', rail: ['Rameswaram (RMM)'], indexable: true },
      { name: 'Nagapattinam', tier: 'Tier 3', airport: 'Trichy Airport (140 km)', airportCode: 'TRZ', rail: ['Nagapattinam Jn (NGT)'] },
      { name: 'Mayiladuthurai', tier: 'Tier 3', airport: 'Trichy Airport (115 km)', airportCode: 'TRZ', rail: ['Mayiladuturai Jn (MV)'] },
      { name: 'Arakkonam', tier: 'Tier 3', airport: 'Chennai Airport (70 km)', airportCode: 'MAA', rail: ['Arakkonam Jn (AJJ)'] },
      { name: 'Ambur', tier: 'Tier 3', airport: 'BLR / Chennai Airport', airportCode: 'BLR', rail: ['Ambur (AB)'] },
      { name: 'Vaniyambadi', tier: 'Tier 3', airport: 'BLR / Chennai Airport', airportCode: 'BLR', rail: ['Vaniyambadi (VN)'] },
      { name: 'Tirupattur', tier: 'Tier 3', airport: 'BLR Airport (145 km)', airportCode: 'BLR', rail: ['Tirupattur (TPT)'] }
    ]
  },
  {
    state: 'Kerala',
    stateSlug: 'kerala',
    region: 'South India',
    cities: [
      { name: 'Munnar', tier: 'Tier 2', airport: 'Cochin International Airport (110 km)', airportCode: 'COK', rail: ['Aluva (110 km)', 'Ernakulam (130 km)'], indexable: true },
      { name: 'Thekkady (Kumily)', tier: 'Tier 2', airport: 'Madurai (140 km) / Cochin (155 km)', airportCode: 'COK', rail: ['Kottayam (110 km)'], indexable: true },
      { name: 'Wayanad (Kalpetta)', tier: 'Tier 2', airport: 'Calicut International Airport (75 km)', airportCode: 'CCJ', rail: ['Kozhikode Main (75 km)'], indexable: true },
      { name: 'Varkala', tier: 'Tier 2', airport: 'Trivandrum Airport (45 km)', airportCode: 'TRV', rail: ['Varkala Sivagiri (VAK)'], indexable: true },
      { name: 'Kovalam', tier: 'Tier 3', airport: 'Trivandrum Airport (15 km)', airportCode: 'TRV', rail: ['Thiruvananthapuram Central (16 km)'] },
      { name: 'Thodupuzha', tier: 'Tier 3', airport: 'Cochin Airport (55 km)', airportCode: 'COK', rail: ['Aluva (55 km)'] },
      { name: 'Perumbavoor', tier: 'Tier 3', airport: 'Cochin Airport (14 km)', airportCode: 'COK', rail: ['Aluva (15 km)'] },
      { name: 'Aluva', tier: 'Tier 3', airport: 'Cochin Airport (10 km)', airportCode: 'COK', rail: ['Aluva (AWY)'] },
      { name: 'Angamaly', tier: 'Tier 3', airport: 'Cochin Airport (6 km)', airportCode: 'COK', rail: ['Angamaly For Kalady (AFK)'] },
      { name: 'Chalakudy', tier: 'Tier 3', airport: 'Cochin Airport (22 km)', airportCode: 'COK', rail: ['Chalakudi (CKI)'] },
      { name: 'Guruvayur', tier: 'Tier 3', airport: 'Cochin Airport (80 km)', airportCode: 'COK', rail: ['Guruvayur (GUV)'] },
      { name: 'Kanhangad', tier: 'Tier 3', airport: 'Kannur (80 km) / Mangalore', airportCode: 'CNN', rail: ['Kanhangad (KZE)'] },
      { name: 'Nilambur', tier: 'Tier 3', airport: 'Calicut Airport (45 km)', airportCode: 'CCJ', rail: ['Nilambur Road (NIL)'] }
    ]
  },
  {
    state: 'Gujarat',
    stateSlug: 'gujarat',
    region: 'West India',
    cities: [
      { name: 'Ankleshwar', tier: 'Tier 3', airport: 'Surat Airport (65 km)', airportCode: 'STV', rail: ['Ankleshwar Jn (AKV)'] },
      { name: 'Dahod', tier: 'Tier 3', airport: 'Vadodara Airport (140 km)', airportCode: 'BDQ', rail: ['Dahod (DHD)'] },
      { name: 'Godhra', tier: 'Tier 3', airport: 'Vadodara Airport (85 km)', airportCode: 'BDQ', rail: ['Godhra Jn (GDA)'] },
      { name: 'Bardoli', tier: 'Tier 3', airport: 'Surat Airport (40 km)', airportCode: 'STV', rail: ['Bardoli (BIY)'] },
      { name: 'Amreli', tier: 'Tier 3', airport: 'Bhavnagar / Rajkot Airport', airportCode: 'HSR', rail: ['Amreli (AE)'] },
      { name: 'Botad', tier: 'Tier 3', airport: 'Bhavnagar Airport (90 km)', airportCode: 'BVP', rail: ['Botad Jn (BTD)'] },
      { name: 'Modasa', tier: 'Tier 3', airport: 'AMD Airport (95 km)', airportCode: 'AMD', rail: ['Modasa (MDSA)'] },
      { name: 'Himatnagar', tier: 'Tier 3', airport: 'AMD Airport (75 km)', airportCode: 'AMD', rail: ['Himatnagar (HMT)'] }
    ]
  },
  {
    state: 'Madhya Pradesh',
    stateSlug: 'madhya-pradesh',
    region: 'Central India',
    cities: [
      { name: 'Mandsaur', tier: 'Tier 3', airport: 'Indore Airport (180 km)', airportCode: 'IDR', rail: ['Mandsor (MDS)'] },
      { name: 'Neemuch', tier: 'Tier 3', airport: 'Udaipur Airport (120 km)', airportCode: 'UDR', rail: ['Nimach (NMH)'] },
      { name: 'Nagda', tier: 'Tier 3', airport: 'Indore Airport (105 km)', airportCode: 'IDR', rail: ['Nagda Jn (NAD)'] },
      { name: 'Itarsi', tier: 'Tier 3', airport: 'Bhopal Airport (95 km)', airportCode: 'BHO', rail: ['Itarsi Jn (ET)'] },
      { name: 'Hoshangabad (Narmadapuram)', tier: 'Tier 3', airport: 'Bhopal Airport (75 km)', airportCode: 'BHO', rail: ['Narmadapuram (NDPM)'] },
      { name: 'Sehore', tier: 'Tier 3', airport: 'Bhopal Airport (40 km)', airportCode: 'BHO', rail: ['Sehore (SEH)'] },
      { name: 'Vidisha', tier: 'Tier 3', airport: 'Bhopal Airport (60 km)', airportCode: 'BHO', rail: ['Vidisha (BHS)'] },
      { name: 'Betul', tier: 'Tier 3', airport: 'Nagpur Airport (170 km) / Bhopal', airportCode: 'NAG', rail: ['Betul (BZU)'] },
      { name: 'Chhindwara', tier: 'Tier 3', airport: 'Nagpur Airport (125 km)', airportCode: 'NAG', rail: ['Chhindwara Jn (CWA)'] }
    ]
  },
  {
    state: 'Rajasthan',
    stateSlug: 'rajasthan',
    region: 'North India',
    cities: [
      { name: 'Sawai Madhopur (Ranthambore)', tier: 'Tier 2', airport: 'Jaipur Airport (140 km)', airportCode: 'JAI', rail: ['Sawai Madhopur Jn (SWM)'], indexable: true },
      { name: 'Dholpur', tier: 'Tier 3', airport: 'Agra Airport (55 km)', airportCode: 'AGR', rail: ['Dhaulpur (DHO)'] },
      { name: 'Gangapur City', tier: 'Tier 3', airport: 'Jaipur Airport (135 km)', airportCode: 'JAI', rail: ['Gangapur City (GGC)'] },
      { name: 'Hindaun', tier: 'Tier 3', airport: 'Jaipur / Agra Airport', airportCode: 'JAI', rail: ['Hindaun City (HAN)'] },
      { name: 'Nagaur', tier: 'Tier 3', airport: 'Jodhpur Airport (135 km)', airportCode: 'JDH', rail: ['Nagaur (NGO)'] },
      { name: 'Makrana', tier: 'Tier 3', airport: 'Jaipur Airport (120 km)', airportCode: 'JAI', rail: ['Makrana Jn (MKN)'] },
      { name: 'Sujangarh', tier: 'Tier 3', airport: 'Jaipur / Bikaner', airportCode: 'JAI', rail: ['Sujangarh (SUJH)'] },
      { name: 'Sardarshahar', tier: 'Tier 3', airport: 'Bikaner / Jaipur', airportCode: 'JAI', rail: ['Sardarshahr (SRDR)'] }
    ]
  },
  {
    state: 'Bihar',
    stateSlug: 'bihar',
    region: 'East & North-East',
    cities: [
      { name: 'Buxar', tier: 'Tier 3', airport: 'Varanasi (110 km) / Patna', airportCode: 'VNS', rail: ['Buxar (BXR)'] },
      { name: 'Sasaram', tier: 'Tier 3', airport: 'Varanasi Airport (125 km)', airportCode: 'VNS', rail: ['Sasaram Jn (SSM)'] },
      { name: 'Dehri', tier: 'Tier 3', airport: 'Varanasi / Gaya Airport', airportCode: 'GAY', rail: ['Dehri On Sone (DOS)'] },
      { name: 'Bettiah', tier: 'Tier 3', airport: 'Gorakhpur / Patna', airportCode: 'GOP', rail: ['Bettiah (BTH)'] },
      { name: 'Motihari', tier: 'Tier 3', airport: 'Patna Airport (150 km)', airportCode: 'PAT', rail: ['Bapudham Motihari (BMKI)'] },
      { name: 'Sitamarhi', tier: 'Tier 3', airport: 'Darbhanga Airport (70 km)', airportCode: 'DBR', rail: ['Sitamarhi (SMI)'] },
      { name: 'Madhubani', tier: 'Tier 3', airport: 'Darbhanga Airport (35 km)', airportCode: 'DBR', rail: ['Madhubani (MBI)'] },
      { name: 'Samastipur', tier: 'Tier 3', airport: 'Darbhanga (45 km) / Patna', airportCode: 'DBR', rail: ['Samastipur Jn (SPJ)'] },
      { name: 'Saharsa', tier: 'Tier 3', airport: 'Darbhanga / Bagdogra', airportCode: 'DBR', rail: ['Saharsa Jn (SHC)'] }
    ]
  },
  {
    state: 'Odisha',
    stateSlug: 'odisha',
    region: 'East & North-East',
    cities: [
      { name: 'Angul', tier: 'Tier 3', airport: 'Bhubaneswar Airport (125 km)', airportCode: 'BBI', rail: ['Angul (ANGL)'] },
      { name: 'Baripada', tier: 'Tier 3', airport: 'Kolkata / Bhubaneswar', airportCode: 'CCU', rail: ['Baripada (BPO)'] },
      { name: 'Jeypore', tier: 'Tier 3', airport: 'Jeypore Airport', airportCode: 'PYB', rail: ['Jeypore (JYP)'] },
      { name: 'Bargarh', tier: 'Tier 3', airport: 'Jharsuguda Airport (90 km)', airportCode: 'JRG', rail: ['Bargarh Road (BRGA)'] },
      { name: 'Paradip', tier: 'Tier 3', airport: 'Bhubaneswar Airport (110 km)', airportCode: 'BBI', rail: ['Paradeep (PRDP)'] }
    ]
  },
  {
    state: 'Jharkhand',
    stateSlug: 'jharkhand',
    region: 'East & North-East',
    cities: [
      { name: 'Chaibasa', tier: 'Tier 3', airport: 'Ranchi Airport (145 km) / Jamshedpur', airportCode: 'IXR', rail: ['Chaibasa (CBSA)'] },
      { name: 'Dumka', tier: 'Tier 3', airport: 'Deoghar Airport (65 km)', airportCode: 'DGH', rail: ['Dumka (DUMK)'] },
      { name: 'Medininagar (Daltonganj)', tier: 'Tier 3', airport: 'Ranchi Airport (170 km)', airportCode: 'IXR', rail: ['Daltonganj (DTO)'] },
      { name: 'Phusro', tier: 'Tier 3', airport: 'Ranchi Airport (110 km)', airportCode: 'IXR', rail: ['Phusro (PUS)'] }
    ]
  }
];

// Append unique cities
const existingSlugs = new Set(currentCities.map(c => c.slug));

for (const grp of additionalStatesCoverage) {
  for (const c of grp.cities) {
    const cityName = c.name;
    const rawState = grp.state;
    const stateSlug = grp.stateSlug;
    const rawSlug = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (existingSlugs.has(rawSlug)) continue;
    existingSlugs.add(rawSlug);

    const isIndexable = Boolean(c.indexable);
    const indexabilityStatus = isIndexable ? 'INDEX' : (c.tier.includes('Tier 2') ? 'REVIEW' : 'NOINDEX');

    const record = {
      city: cityName,
      state: rawState,
      stateSlug: stateSlug,
      region: grp.region,
      tier: c.tier,
      slug: rawSlug,
      canonical: `/locations/${stateSlug}/${rawSlug}`,
      indexability: indexabilityStatus,
      contentStatus: isIndexable ? 'PUBLISHED' : (indexabilityStatus === 'REVIEW' ? 'READY' : 'DRAFT'),
      description: `Travelers departing from ${cityName} (${rawState}) enjoy seamless connectivity to Outdoor Vacationz handcrafted holiday packages across Kerala, Vietnam, Singapore, Malaysia, and Meghalaya.`,
      relevantTravelServices: [
        'Door-to-door vacation coordination',
        'Private chauffeur & vehicle booking',
        'Direct or connecting group flight ticketing',
        'Tailor-made honeymoon & family packages',
        'Pre-approved e-visa assistance for Southeast Asia'
      ],
      nearbyDestinations: [
        'Kerala tea hills & backwaters',
        'Vietnam Halong Bay & Da Nang',
        'Singapore & Genting Dream Cruise',
        'Malaysia Kuala Lumpur & Langkawi',
        'Meghalaya Living Root Bridges & Shillong'
      ],
      relevantTourCategories: ['Domestic Hills & Backwaters', 'International City & Island', 'Nature & Cultural Circuits'],
      airport: {
        name: c.airport,
        code: c.airportCode,
        hasDirectInternational: ['DEL', 'BOM', 'BLR', 'MAA', 'HYD', 'CCU', 'AMD', 'COK'].includes(c.airportCode)
      },
      railway: c.rail || [`${cityName} Railway Station`],
      travelPlanningInfo: `From ${cityName}, travelers can connect through ${c.airportCode} with daily direct morning flights into Cochin (COK) for Kerala tours or Southeast Asian gateways (Hanoi, Da Nang, Singapore, Kuala Lumpur). Private vehicle pickups meet your flight upon landing.`,
      seoTitle: `Holiday Packages from ${cityName} | Tours & Travel | Outdoor Vacationz`,
      seoDescription: `Book curated holiday packages from ${cityName} (${rawState}). Seamless flight connections to Kerala, Vietnam, Singapore, Malaysia, and Meghalaya with private tours.`,
      relatedDestinations: ['kerala', 'vietnam', 'singapore', 'malaysia-langkawi', 'north-east'],
      relatedPackages: ['kerala', 'vietnam', 'singapore-cruise', 'malaysia-kuala-lumpur-langkawi', 'north-east'],
      relatedBlogs: [
        'kerala-5-day-itinerary',
        'vietnam-travel-guide-first-timers',
        'singapore-malaysia-combined-trip-planner',
        'meghalaya-living-root-bridges-cherrapunji-guide'
      ],
      localFAQs: [
        {
          question: `Can I book flights from ${cityName} directly with the tour package?`,
          answer: `Yes! While all Outdoor Vacationz packages cover land arrangements (3/4-star hotels, private sightseeing cars, daily breakfast, and passes), our ticketing desk can arrange group-fare or promotional air tickets departing from ${c.airportCode}.`
        },
        {
          question: `What is the most popular vacation circuit from ${cityName}?`,
          answer: `Our 5N/6D Kerala tour and 5N/6D Vietnam package are the top favorites from ${cityName} due to excellent flight transit timings and comprehensive private sightseeing.`
        }
      ]
    };

    currentCities.push(record);
  }
}

// Write the enlarged database to client/src/data/indiaCityDatabase.json
fs.writeFileSync(clientJsonPath, JSON.stringify(currentCities, null, 2), 'utf8');

console.log(`TOTAL EXPANDED CITIES: ${currentCities.length}`);
console.log(`INDEXABLE: ${currentCities.filter(c => c.indexability === 'INDEX').length}`);
console.log(`REVIEW: ${currentCities.filter(c => c.indexability === 'REVIEW').length}`);
console.log(`NOINDEX: ${currentCities.filter(c => c.indexability === 'NOINDEX').length}`);
