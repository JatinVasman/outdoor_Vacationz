const fs = require('fs');
const path = require('path');

// Ensure SEO directory exists in root
const seoDir = path.join(__dirname, '..', 'SEO');
if (!fs.existsSync(seoDir)) {
  fs.mkdirSync(seoDir, { recursive: true });
}

// Master Indian States and Cities Dataset
const statesData = [
  {
    state: 'Uttar Pradesh',
    stateSlug: 'uttar-pradesh',
    region: 'North India',
    capital: 'Lucknow',
    cities: [
      { name: 'Noida', tier: 'Tier 1/major urban market', airport: 'Indira Gandhi Int Airport (DEL) / Upcoming Jewar (DXN)', airportCode: 'DEL', rail: ['Anand Vihar (ANVT)', 'Ghaziabad (GZB)'], indexable: true },
      { name: 'Greater Noida', tier: 'Tier 2', airport: 'DEL / Noida International (DXN)', airportCode: 'DEL', rail: ['Boraki', 'Ghaziabad (GZB)'], indexable: true },
      { name: 'Lucknow', tier: 'Tier 2', airport: 'Chaudhary Charan Singh Int Airport', airportCode: 'LKO', rail: ['Lucknow Charbagh (LKO)', 'Lucknow Jn (LJN)'], indexable: true },
      { name: 'Kanpur', tier: 'Tier 2', airport: 'Kanpur Airport (Chakeri)', airportCode: 'KNU', rail: ['Kanpur Central (CNB)'], indexable: true },
      { name: 'Varanasi', tier: 'Tier 2', airport: 'Lal Bahadur Shastri Int Airport', airportCode: 'VNS', rail: ['Varanasi Jn (BSB)', 'Banaras (BSBS)'], indexable: true },
      { name: 'Agra', tier: 'Tier 2', airport: 'Agra Airport (Kheria)', airportCode: 'AGR', rail: ['Agra Cantt (AGC)', 'Agra Fort (AF)'], indexable: true },
      { name: 'Prayagraj', tier: 'Tier 2', airport: 'Prayagraj Airport (Bamrauli)', airportCode: 'IXD', rail: ['Prayagraj Jn (PRYJ)'], indexable: true },
      { name: 'Ghaziabad', tier: 'Tier 2', airport: 'DEL / Hindon Airport (HDO)', airportCode: 'HDO', rail: ['Ghaziabad Jn (GZB)'], indexable: true },
      { name: 'Meerut', tier: 'Tier 2', airport: 'DEL Airport via Delhi-Meerut Expressway', airportCode: 'DEL', rail: ['Meerut City (MTC)'], indexable: true },
      { name: 'Bareilly', tier: 'Tier 3', airport: 'Bareilly Airport', airportCode: 'BEK', rail: ['Bareilly Jn (BE)'] },
      { name: 'Aligarh', tier: 'Tier 3', airport: 'DEL Airport (130 km)', airportCode: 'DEL', rail: ['Aligarh Jn (ALJN)'] },
      { name: 'Moradabad', tier: 'Tier 3', airport: 'Moradabad Airport', airportCode: 'DEL', rail: ['Moradabad Jn (MB)'] },
      { name: 'Saharanpur', tier: 'Tier 3', airport: 'Jolly Grant Dehradun (75 km)', airportCode: 'DED', rail: ['Saharanpur Jn (SRE)'] },
      { name: 'Gorakhpur', tier: 'Tier 2', airport: 'Gorakhpur Airport (Mahayogi Gorakhnath)', airportCode: 'GOP', rail: ['Gorakhpur Jn (GKP)'], indexable: true },
      { name: 'Ayodhya', tier: 'Tier 2', airport: 'Maharishi Valmiki Int Airport', airportCode: 'AYJ', rail: ['Ayodhya Dham (AY)', 'Ayodhya Cantt (AYC)'], indexable: true },
      { name: 'Jhansi', tier: 'Tier 3', airport: 'Gwalior Airport (100 km)', airportCode: 'GWL', rail: ['Veerangana Lakshmibai Jn (VGLJ)'] },
      { name: 'Mathura', tier: 'Tier 3', airport: 'Agra Airport (60 km) / DEL', airportCode: 'AGR', rail: ['Mathura Jn (MTJ)'] },
      { name: 'Muzaffarnagar', tier: 'Tier 3', airport: 'DEL Airport (120 km)', airportCode: 'DEL', rail: ['Muzaffarnagar (MOZ)'] },
      { name: 'Firozabad', tier: 'Tier 3', airport: 'Agra Airport (45 km)', airportCode: 'AGR', rail: ['Firozabad (FZD)'] },
      { name: 'Mirzapur', tier: 'Tier 3', airport: 'Varanasi Airport (65 km)', airportCode: 'VNS', rail: ['Mirzapur (MZP)'] },
      { name: 'Shahjahanpur', tier: 'Tier 3', airport: 'Bareilly Airport (80 km)', airportCode: 'BEK', rail: ['Shahjahanpur (SPN)'] },
      { name: 'Rampur', tier: 'Tier 3', airport: 'Bareilly / Moradabad', airportCode: 'BEK', rail: ['Rampur Jn (RMU)'] },
      { name: 'Sambhal', tier: 'Tier 3', airport: 'DEL Airport (150 km)', airportCode: 'DEL', rail: ['Sambhal Hatim Sarai'] },
      { name: 'Amroha', tier: 'Tier 3', airport: 'DEL Airport (130 km)', airportCode: 'DEL', rail: ['Amroha (AMRO)'] },
      { name: 'Farrukhabad', tier: 'Tier 3', airport: 'Kanpur Airport (140 km)', airportCode: 'KNU', rail: ['Farrukhabad Jn (FBD)'] },
      { name: 'Hapur', tier: 'Tier 3', airport: 'DEL Airport (75 km)', airportCode: 'DEL', rail: ['Hapur Jn (HPU)'] },
      { name: 'Etawah', tier: 'Tier 3', airport: 'Kanpur / Agra Airport', airportCode: 'AGR', rail: ['Etawah Jn (ETW)'] },
      { name: 'Bulandshahr', tier: 'Tier 3', airport: 'DEL Airport (90 km)', airportCode: 'DEL', rail: ['Bulandshahr (BSC)'] },
      { name: 'Raebareli', tier: 'Tier 3', airport: 'Lucknow Airport (80 km)', airportCode: 'LKO', rail: ['Rae Bareli Jn (RBL)'] },
      { name: 'Budaun', tier: 'Tier 3', airport: 'Bareilly Airport (50 km)', airportCode: 'BEK', rail: ['Budaun (BXM)'] },
      { name: 'Jaunpur', tier: 'Tier 3', airport: 'Varanasi Airport (40 km)', airportCode: 'VNS', rail: ['Jaunpur Jn (JNU)'] },
      { name: 'Lakhimpur', tier: 'Tier 3', airport: 'Lucknow Airport (135 km)', airportCode: 'LKO', rail: ['Lakhimpur (LMP)'] },
      { name: 'Hathras', tier: 'Tier 3', airport: 'Agra Airport (55 km)', airportCode: 'AGR', rail: ['Hathras City (HTC)'] },
      { name: 'Banda', tier: 'Tier 3', airport: 'Khajuraho Airport (110 km)', airportCode: 'HJR', rail: ['Banda Jn (BNDA)'] },
      { name: 'Pilibhit', tier: 'Tier 3', airport: 'Bareilly Airport (55 km)', airportCode: 'BEK', rail: ['Pilibhit Jn (PBE)'] },
      { name: 'Barabanki', tier: 'Tier 3', airport: 'Lucknow Airport (35 km)', airportCode: 'LKO', rail: ['Barabanki Jn (BBK)'] },
      { name: 'Sitapur', tier: 'Tier 3', airport: 'Lucknow Airport (90 km)', airportCode: 'LKO', rail: ['Sitapur Jn (STP)'] }
    ]
  },
  {
    state: 'Maharashtra',
    stateSlug: 'maharashtra',
    region: 'West India',
    capital: 'Mumbai',
    cities: [
      { name: 'Mumbai', tier: 'Tier 1', airport: 'Chhatrapati Shivaji Maharaj Int Airport', airportCode: 'BOM', rail: ['CSMT', 'Mumbai Central (MMCT)', 'Bandra (BDTS)'], indexable: true },
      { name: 'Pune', tier: 'Tier 1', airport: 'Pune International Airport', airportCode: 'PNQ', rail: ['Pune Jn (PUNE)', 'Shivajinagar (SVJR)'], indexable: true },
      { name: 'Nagpur', tier: 'Tier 2', airport: 'Dr. Babasaheb Ambedkar Int Airport', airportCode: 'NAG', rail: ['Nagpur Jn (NGP)'], indexable: true },
      { name: 'Thane', tier: 'Tier 1/major urban market', airport: 'BOM Airport (25 km)', airportCode: 'BOM', rail: ['Thane (TNA)'], indexable: true },
      { name: 'Nashik', tier: 'Tier 2', airport: 'Nashik Airport (Ozar)', airportCode: 'ISK', rail: ['Nasik Road (NK)'], indexable: true },
      { name: 'Navi Mumbai', tier: 'Tier 1/major urban market', airport: 'BOM / Upcoming Navi Mumbai (NMI)', airportCode: 'BOM', rail: ['Panvel (PNVL)', 'Vashi'], indexable: true },
      { name: 'Chhatrapati Sambhajinagar', tier: 'Tier 2', airport: 'Aurangabad Airport', airportCode: 'IXU', rail: ['Aurangabad (AWB)'], indexable: true },
      { name: 'Solapur', tier: 'Tier 2', airport: 'Solapur Airport', airportCode: 'SSE', rail: ['Solapur (SUR)'] },
      { name: 'Kolhapur', tier: 'Tier 2', airport: 'Chhatrapati Rajaram Maharaj Airport', airportCode: 'KLH', rail: ['C Shahumharaj T (KOP)'], indexable: true },
      { name: 'Amravati', tier: 'Tier 3', airport: 'Nagpur Airport (150 km)', airportCode: 'NAG', rail: ['Badnera Jn (BD)'] },
      { name: 'Jalgaon', tier: 'Tier 3', airport: 'Jalgaon Airport', airportCode: 'JLG', rail: ['Jalgaon Jn (JL)'] },
      { name: 'Akola', tier: 'Tier 3', airport: 'Akola Airport', airportCode: 'AKD', rail: ['Akola Jn (AK)'] },
      { name: 'Latur', tier: 'Tier 3', airport: 'Latur Airport', airportCode: 'LTR', rail: ['Latur (LUR)'] },
      { name: 'Dhule', tier: 'Tier 3', airport: 'Nashik / Jalgaon Airport', airportCode: 'ISK', rail: ['Dhule (DHI)'] },
      { name: 'Ahmednagar', tier: 'Tier 3', airport: 'Pune Airport (120 km)', airportCode: 'PNQ', rail: ['Ahmadnagar (ANG)'] },
      { name: 'Chandrapur', tier: 'Tier 3', airport: 'Nagpur Airport (145 km)', airportCode: 'NAG', rail: ['Chandrapur (CD)'] },
      { name: 'Parbhani', tier: 'Tier 3', airport: 'Nanded Airport (70 km)', airportCode: 'NDC', rail: ['Parbhani Jn (PBN)'] },
      { name: 'Nanded', tier: 'Tier 2', airport: 'Shri Guru Gobind Singh Ji Airport', airportCode: 'NDC', rail: ['Huzur Sahib Nanded (NED)'], indexable: true },
      { name: 'Jalna', tier: 'Tier 3', airport: 'Aurangabad Airport (60 km)', airportCode: 'IXU', rail: ['Jalna (J)'] },
      { name: 'Bhiwandi', tier: 'Tier 3', airport: 'BOM Airport (40 km)', airportCode: 'BOM', rail: ['Bhiwandi Road (BIRD)'] },
      { name: 'Kalyan-Dombivli', tier: 'Tier 2', airport: 'BOM Airport (45 km)', airportCode: 'BOM', rail: ['Kalyan Jn (KYN)'], indexable: true },
      { name: 'Mira-Bhayandar', tier: 'Tier 2', airport: 'BOM Airport (25 km)', airportCode: 'BOM', rail: ['Bhayandar (BYR)'] },
      { name: 'Vasai-Virar', tier: 'Tier 2', airport: 'BOM Airport (45 km)', airportCode: 'BOM', rail: ['Vasai Road (BSR)'] },
      { name: 'Panvel', tier: 'Tier 2', airport: 'Navi Mumbai Airport site (10 km)', airportCode: 'BOM', rail: ['Panvel Jn (PNVL)'], indexable: true },
      { name: 'Satara', tier: 'Tier 3', airport: 'Pune Airport (110 km)', airportCode: 'PNQ', rail: ['Satara (STR)'] },
      { name: 'Ratnagiri', tier: 'Tier 3', airport: 'Ratnagiri Airport', airportCode: 'RTC', rail: ['Ratnagiri (RN)'] },
      { name: 'Sindhudurg', tier: 'Tier 3', airport: 'Sindhudurg Airport (Chipi)', airportCode: 'SDW', rail: ['Kudal (KUDL)'] },
      { name: 'Sangli', tier: 'Tier 3', airport: 'Kolhapur Airport (50 km)', airportCode: 'KLH', rail: ['Sangli (SLI)'] },
      { name: 'Wardha', tier: 'Tier 3', airport: 'Nagpur Airport (75 km)', airportCode: 'NAG', rail: ['Wardha Jn (WR)'] },
      { name: 'Gondia', tier: 'Tier 3', airport: 'Birsi Airport', airportCode: 'GDB', rail: ['Gondia Jn (G)'] }
    ]
  },
  {
    state: 'Karnataka',
    stateSlug: 'karnataka',
    region: 'South India',
    capital: 'Bengaluru',
    cities: [
      { name: 'Bengaluru', tier: 'Tier 1', airport: 'Kempegowda International Airport', airportCode: 'BLR', rail: ['KSR Bengaluru (SBC)', 'Yesvantpur (YPR)'], indexable: true },
      { name: 'Mysuru', tier: 'Tier 2', airport: 'Mysore Airport (Mandakalli)', airportCode: 'MYQ', rail: ['Mysuru Jn (MYS)'], indexable: true },
      { name: 'Mangaluru', tier: 'Tier 2', airport: 'Mangaluru International Airport', airportCode: 'IXE', rail: ['Mangaluru Central (MAQ)', 'Mangaluru Jn (MAJN)'], indexable: true },
      { name: 'Hubballi-Dharwad', tier: 'Tier 2', airport: 'Hubballi Airport', airportCode: 'HBX', rail: ['SSS Hubballi Jn (UBL)'], indexable: true },
      { name: 'Belagavi', tier: 'Tier 2', airport: 'Belagavi Airport (Sambre)', airportCode: 'IXG', rail: ['Belagavi (BGM)'], indexable: true },
      { name: 'Kalaburagi', tier: 'Tier 2', airport: 'Kalaburagi Airport', airportCode: 'GBI', rail: ['Kalaburagi Jn (KLBG)'] },
      { name: 'Davanagere', tier: 'Tier 3', airport: 'Hubballi Airport (140 km)', airportCode: 'HBX', rail: ['Davangere (DVG)'] },
      { name: 'Ballari', tier: 'Tier 3', airport: 'Jindal Vijaynagar Airport (Toranagallu)', airportCode: 'VDY', rail: ['Ballari Jn (BAY)'] },
      { name: 'Vijayapura', tier: 'Tier 3', airport: 'Upcoming Bijapur Airport', airportCode: 'GBI', rail: ['Vijayapura (BJP)'] },
      { name: 'Shivamogga', tier: 'Tier 2', airport: 'Kuvempu Airport', airportCode: 'RQY', rail: ['Shivamogga Town (SMET)'], indexable: true },
      { name: 'Tumakuru', tier: 'Tier 3', airport: 'BLR Airport (85 km)', airportCode: 'BLR', rail: ['Tumakuru (TK)'] },
      { name: 'Udupi', tier: 'Tier 3', airport: 'Mangaluru Airport (55 km)', airportCode: 'IXE', rail: ['Udupi (UD)'] },
      { name: 'Bidar', tier: 'Tier 3', airport: 'Bidar Airport', airportCode: 'IXX', rail: ['Bidar (BIDR)'] },
      { name: 'Hospet', tier: 'Tier 3', airport: 'Jindal Airport (35 km)', airportCode: 'VDY', rail: ['Hosapete Jn (HPT)'] },
      { name: 'Gadag', tier: 'Tier 3', airport: 'Hubballi Airport (60 km)', airportCode: 'HBX', rail: ['Gadag Jn (GDG)'] },
      { name: 'Robertsonpet', tier: 'Tier 3', airport: 'BLR Airport (95 km)', airportCode: 'BLR', rail: ['Bangarapet Jn (BWT)'] },
      { name: 'Hassan', tier: 'Tier 3', airport: 'BLR / Mangalore Airport', airportCode: 'BLR', rail: ['Hassan Jn (HAS)'] },
      { name: 'Bhadravati', tier: 'Tier 3', airport: 'Shivamogga Airport (20 km)', airportCode: 'RQY', rail: ['Bhadravati (BDVT)'] },
      { name: 'Chitradurga', tier: 'Tier 3', airport: 'Hubballi / BLR Airport', airportCode: 'BLR', rail: ['Chitradurga (CTA)'] },
      { name: 'Kolar', tier: 'Tier 3', airport: 'BLR Airport (70 km)', airportCode: 'BLR', rail: ['Kolar (KQZ)'] },
      { name: 'Mandya', tier: 'Tier 3', airport: 'Mysuru Airport (45 km)', airportCode: 'MYQ', rail: ['Mandya (MYA)'] },
      { name: 'Chikkamagaluru', tier: 'Tier 3', airport: 'Mangaluru Airport (150 km)', airportCode: 'IXE', rail: ['Chikkamagaluru (CMGR)'] },
      { name: 'Madikeri (Coorg)', tier: 'Tier 3', airport: 'Kannur Airport (90 km) / Mangalore', airportCode: 'CNN', rail: ['Mysuru (120 km)'] }
    ]
  },
  {
    state: 'Tamil Nadu',
    stateSlug: 'tamil-nadu',
    region: 'South India',
    capital: 'Chennai',
    cities: [
      { name: 'Chennai', tier: 'Tier 1', airport: 'Chennai International Airport', airportCode: 'MAA', rail: ['MGR Chennai Central (MAS)', 'Chennai Egmore (MS)'], indexable: true },
      { name: 'Coimbatore', tier: 'Tier 2', airport: 'Coimbatore International Airport', airportCode: 'CJB', rail: ['Coimbatore Jn (CBE)'], indexable: true },
      { name: 'Madurai', tier: 'Tier 2', airport: 'Madurai Airport', airportCode: 'IXM', rail: ['Madurai Jn (MDU)'], indexable: true },
      { name: 'Tiruchirappalli', tier: 'Tier 2', airport: 'Tiruchirappalli International Airport', airportCode: 'TRZ', rail: ['Tiruchchirappalli Jn (TPJ)'], indexable: true },
      { name: 'Salem', tier: 'Tier 2', airport: 'Salem Airport', airportCode: 'SXV', rail: ['Salem Jn (SA)'], indexable: true },
      { name: 'Tirunelveli', tier: 'Tier 2', airport: 'Tuticorin Airport (40 km)', airportCode: 'TCR', rail: ['Tirunelveli Jn (TEN)'] },
      { name: 'Tiruppur', tier: 'Tier 2', airport: 'Coimbatore Airport (45 km)', airportCode: 'CJB', rail: ['Tiruppur (TUP)'], indexable: true },
      { name: 'Erode', tier: 'Tier 3', airport: 'Coimbatore Airport (90 km)', airportCode: 'CJB', rail: ['Erode Jn (ED)'] },
      { name: 'Vellore', tier: 'Tier 2', airport: 'Vellore Airport', airportCode: 'MAA', rail: ['Katpadi Jn (KPD)'], indexable: true },
      { name: 'Thoothukudi', tier: 'Tier 3', airport: 'Tuticorin Airport', airportCode: 'TCR', rail: ['Tuticorin (TN)'] },
      { name: 'Dindigul', tier: 'Tier 3', airport: 'Madurai Airport (70 km)', airportCode: 'IXM', rail: ['Dindigul Jn (DG)'] },
      { name: 'Thanjavur', tier: 'Tier 3', airport: 'Trichy Airport (55 km)', airportCode: 'TRZ', rail: ['Thanjavur Jn (TJ)'] },
      { name: 'Ranipet', tier: 'Tier 3', airport: 'Chennai Airport (100 km)', airportCode: 'MAA', rail: ['Walajah Road (WJR)'] },
      { name: 'Sivakasi', tier: 'Tier 3', airport: 'Madurai Airport (70 km)', airportCode: 'IXM', rail: ['Sivakasi (SVKS)'] },
      { name: 'Karur', tier: 'Tier 3', airport: 'Trichy Airport (80 km)', airportCode: 'TRZ', rail: ['Karur Jn (KRR)'] },
      { name: 'Ooty (Udhagamandalam)', tier: 'Tier 3', airport: 'Coimbatore Airport (88 km)', airportCode: 'CJB', rail: ['Udagamandalam (UAM)'] },
      { name: 'Hosur', tier: 'Tier 2', airport: 'BLR Airport (75 km)', airportCode: 'BLR', rail: ['Hosur (HSRA)'], indexable: true },
      { name: 'Nagercoil', tier: 'Tier 3', airport: 'Trivandrum Airport (70 km)', airportCode: 'TRV', rail: ['Nagercoil Jn (NCJ)'] },
      { name: 'Kanchipuram', tier: 'Tier 3', airport: 'Chennai Airport (65 km)', airportCode: 'MAA', rail: ['Kanchipuram (CJ)'] },
      { name: 'Kumarapalayam', tier: 'Tier 3', airport: 'Salem Airport (60 km)', airportCode: 'SXV', rail: ['Erode Jn (15 km)'] },
      { name: 'Karaikudi', tier: 'Tier 3', airport: 'Trichy / Madurai Airport', airportCode: 'TRZ', rail: ['Karaikkudi Jn (KKDI)'] },
      { name: 'Neyveli', tier: 'Tier 3', airport: 'Pondicherry Airport (65 km)', airportCode: 'PNY', rail: ['Neyveli (NVL)'] },
      { name: 'Cuddalore', tier: 'Tier 3', airport: 'Pondicherry Airport (30 km)', airportCode: 'PNY', rail: ['Cuddalore Port Jn (COT)'] },
      { name: 'Kumbakonam', tier: 'Tier 3', airport: 'Trichy Airport (95 km)', airportCode: 'TRZ', rail: ['Kumbakonam (KMU)'] },
      { name: 'Tiruvannamalai', tier: 'Tier 3', airport: 'Chennai / Pondicherry', airportCode: 'MAA', rail: ['Tiruvannamalai (TNM)'] }
    ]
  },
  {
    state: 'Delhi (NCT)',
    stateSlug: 'delhi',
    region: 'North India',
    capital: 'New Delhi',
    cities: [
      { name: 'Delhi', tier: 'Tier 1', airport: 'Indira Gandhi International Airport', airportCode: 'DEL', rail: ['New Delhi (NDLS)', 'Old Delhi (DLI)', 'Hazrat Nizamuddin (NZM)'], indexable: true },
      { name: 'New Delhi', tier: 'Tier 1', airport: 'Indira Gandhi International Airport', airportCode: 'DEL', rail: ['NDLS', 'NZM'], indexable: true },
      { name: 'Dwarka', tier: 'Tier 1/major urban market', airport: 'DEL Airport (5 km)', airportCode: 'DEL', rail: ['New Delhi (NDLS)'], indexable: true },
      { name: 'Rohini', tier: 'Tier 1/major urban market', airport: 'DEL Airport (25 km)', airportCode: 'DEL', rail: ['Old Delhi (DLI)'], indexable: true },
      { name: 'South Delhi', tier: 'Tier 1/major urban market', airport: 'DEL Airport (12 km)', airportCode: 'DEL', rail: ['Hazrat Nizamuddin (NZM)'], indexable: true }
    ]
  },
  {
    state: 'Haryana',
    stateSlug: 'haryana',
    region: 'North India',
    capital: 'Chandigarh',
    cities: [
      { name: 'Gurugram (Gurgaon)', tier: 'Tier 1/major urban market', airport: 'DEL Airport (15 km)', airportCode: 'DEL', rail: ['Gurgaon (GGN)', 'New Delhi (NDLS)'], indexable: true },
      { name: 'Faridabad', tier: 'Tier 2', airport: 'DEL Airport (35 km)', airportCode: 'DEL', rail: ['Faridabad (FDB)'], indexable: true },
      { name: 'Panipat', tier: 'Tier 2', airport: 'DEL Airport (95 km)', airportCode: 'DEL', rail: ['Panipat Jn (PNP)'], indexable: true },
      { name: 'Ambala', tier: 'Tier 2', airport: 'Chandigarh Airport (40 km)', airportCode: 'IXC', rail: ['Ambala Cantt (UMB)'], indexable: true },
      { name: 'Yamunanagar', tier: 'Tier 3', airport: 'Chandigarh / Dehradun', airportCode: 'IXC', rail: ['Jagadhri / Yamunanagar (YJUD)'] },
      { name: 'Rohtak', tier: 'Tier 3', airport: 'DEL Airport (75 km)', airportCode: 'DEL', rail: ['Rohtak Jn (ROK)'] },
      { name: 'Hisar', tier: 'Tier 3', airport: 'Hisar Airport (Maharaja Agrasen)', airportCode: 'HSS', rail: ['Hisar (HSR)'] },
      { name: 'Karnal', tier: 'Tier 3', airport: 'DEL Airport (130 km)', airportCode: 'DEL', rail: ['Karnal (KUN)'] },
      { name: 'Sonipat', tier: 'Tier 3', airport: 'DEL Airport (55 km)', airportCode: 'DEL', rail: ['Sonipat (SNP)'] },
      { name: 'Panchkula', tier: 'Tier 2', airport: 'Chandigarh Airport (12 km)', airportCode: 'IXC', rail: ['Chandigarh (CDG)'], indexable: true },
      { name: 'Bahadurgarh', tier: 'Tier 3', airport: 'DEL Airport (35 km)', airportCode: 'DEL', rail: ['Bahadurgarh (BGZ)'] },
      { name: 'Sirsa', tier: 'Tier 3', airport: 'Bathinda / Hisar Airport', airportCode: 'BTI', rail: ['Sirsa (SSA)'] },
      { name: 'Rewari', tier: 'Tier 3', airport: 'DEL Airport (75 km)', airportCode: 'DEL', rail: ['Rewari Jn (RE)'] },
      { name: 'Kaithal', tier: 'Tier 3', airport: 'Chandigarh Airport (110 km)', airportCode: 'IXC', rail: ['Kaithal (KLE)'] },
      { name: 'Palwal', tier: 'Tier 3', airport: 'DEL Airport (65 km)', airportCode: 'DEL', rail: ['Palwal (PWL)'] }
    ]
  },
  {
    state: 'Punjab & Chandigarh',
    stateSlug: 'punjab',
    region: 'North India',
    capital: 'Chandigarh',
    cities: [
      { name: 'Chandigarh', tier: 'Tier 2', airport: 'Shaheed Bhagat Singh Int Airport', airportCode: 'IXC', rail: ['Chandigarh (CDG)'], indexable: true },
      { name: 'Mohali (SAS Nagar)', tier: 'Tier 2', airport: 'Chandigarh Airport (adjacent)', airportCode: 'IXC', rail: ['SAS Nagar Mohali (SASN)'], indexable: true },
      { name: 'Ludhiana', tier: 'Tier 2', airport: 'Sahnewal Airport / Halwara', airportCode: 'LUH', rail: ['Ludhiana Jn (LDH)'], indexable: true },
      { name: 'Amritsar', tier: 'Tier 2', airport: 'Sri Guru Ram Dass Jee Int Airport', airportCode: 'ATQ', rail: ['Amritsar Jn (ASR)'], indexable: true },
      { name: 'Jalandhar', tier: 'Tier 2', airport: 'Adampur Airport', airportCode: 'AIP', rail: ['Jalandhar City (JUC)', 'Jalandhar Cantt (JRC)'], indexable: true },
      { name: 'Patiala', tier: 'Tier 2', airport: 'Chandigarh Airport (60 km)', airportCode: 'IXC', rail: ['Patiala (PTA)'], indexable: true },
      { name: 'Bathinda', tier: 'Tier 3', airport: 'Bathinda Airport', airportCode: 'BTI', rail: ['Bathinda Jn (BTI)'] },
      { name: 'Hoshiarpur', tier: 'Tier 3', airport: 'Adampur Airport (25 km)', airportCode: 'AIP', rail: ['Hoshiarpur (HSX)'] },
      { name: 'Batala', tier: 'Tier 3', airport: 'Amritsar Airport (40 km)', airportCode: 'ATQ', rail: ['Batala Jn (BAT)'] },
      { name: 'Pathankot', tier: 'Tier 3', airport: 'Pathankot Airport', airportCode: 'IXP', rail: ['Pathankot Cantt (PTKC)'] },
      { name: 'Moga', tier: 'Tier 3', airport: 'Ludhiana / Bathinda Airport', airportCode: 'LUH', rail: ['Moga (MOGA)'] },
      { name: 'Abohar', tier: 'Tier 3', airport: 'Bathinda Airport (75 km)', airportCode: 'BTI', rail: ['Abohar (ABS)'] },
      { name: 'Malerkotla', tier: 'Tier 3', airport: 'Ludhiana Airport (45 km)', airportCode: 'LUH', rail: ['Malerkotla (MET)'] },
      { name: 'Khanna', tier: 'Tier 3', airport: 'Ludhiana / Chandigarh', airportCode: 'IXC', rail: ['Khanna (KNN)'] },
      { name: 'Phagwara', tier: 'Tier 3', airport: 'Adampur Airport (20 km)', airportCode: 'AIP', rail: ['Phagwara Jn (PGW)'] },
      { name: 'Firozpur', tier: 'Tier 3', airport: 'Amritsar / Bathinda', airportCode: 'ATQ', rail: ['Firozpur Cantt (FZR)'] }
    ]
  },
  {
    state: 'Gujarat',
    stateSlug: 'gujarat',
    region: 'West India',
    capital: 'Gandhinagar',
    cities: [
      { name: 'Ahmedabad', tier: 'Tier 1', airport: 'Sardar Vallabhbhai Patel Int Airport', airportCode: 'AMD', rail: ['Ahmedabad Jn (ADI)', 'Sabarmati (SBT)'], indexable: true },
      { name: 'Surat', tier: 'Tier 2', airport: 'Surat International Airport', airportCode: 'STV', rail: ['Surat (ST)'], indexable: true },
      { name: 'Vadodara', tier: 'Tier 2', airport: 'Vadodara Airport (Civil Aerodrome)', airportCode: 'BDQ', rail: ['Vadodara Jn (BRC)'], indexable: true },
      { name: 'Rajkot', tier: 'Tier 2', airport: 'Rajkot International Airport (Hirasar)', airportCode: 'HSR', rail: ['Rajkot Jn (RJT)'], indexable: true },
      { name: 'Bhavnagar', tier: 'Tier 2', airport: 'Bhavnagar Airport', airportCode: 'BVP', rail: ['Bhavnagar Terminus (BVC)'] },
      { name: 'Jamnagar', tier: 'Tier 2', airport: 'Jamnagar Airport', airportCode: 'JGA', rail: ['Jamnagar (JAM)'], indexable: true },
      { name: 'Gandhinagar', tier: 'Tier 2', airport: 'AMD Airport (18 km)', airportCode: 'AMD', rail: ['Gandhinagar Capital (GNC)'], indexable: true },
      { name: 'Junagadh', tier: 'Tier 3', airport: 'Rajkot Airport (100 km) / Keshod', airportCode: 'HSR', rail: ['Junagadh Jn (JND)'] },
      { name: 'Gandhidham', tier: 'Tier 3', airport: 'Kandla Airport', airportCode: 'IXY', rail: ['Gandhidham Jn (GIMB)'] },
      { name: 'Anand', tier: 'Tier 2', airport: 'Vadodara (40 km) / AMD (65 km)', airportCode: 'BDQ', rail: ['Anand Jn (ANND)'], indexable: true },
      { name: 'Navsari', tier: 'Tier 3', airport: 'Surat Airport (35 km)', airportCode: 'STV', rail: ['Navsari (NVS)'] },
      { name: 'Morbi', tier: 'Tier 3', airport: 'Rajkot Airport (65 km)', airportCode: 'HSR', rail: ['Morbi (MVI)'] },
      { name: 'Nadiad', tier: 'Tier 3', airport: 'AMD Airport (55 km)', airportCode: 'AMD', rail: ['Nadiad Jn (ND)'] },
      { name: 'Surendranagar', tier: 'Tier 3', airport: 'Rajkot / Ahmedabad', airportCode: 'AMD', rail: ['Surendranagar (SUNR)'] },
      { name: 'Bharuch', tier: 'Tier 3', airport: 'Surat Airport (70 km) / Vadodara', airportCode: 'STV', rail: ['Bharuch Jn (BH)'] },
      { name: 'Mehsana', tier: 'Tier 3', airport: 'AMD Airport (75 km)', airportCode: 'AMD', rail: ['Mahesana Jn (MSH)'] },
      { name: 'Bhuj', tier: 'Tier 2', airport: 'Bhuj Airport', airportCode: 'BHJ', rail: ['Bhuj (BHUJ)'], indexable: true },
      { name: 'Porbandar', tier: 'Tier 3', airport: 'Porbandar Airport', airportCode: 'PBD', rail: ['Porbandar (PBR)'] },
      { name: 'Palanpur', tier: 'Tier 3', airport: 'AMD Airport (135 km)', airportCode: 'AMD', rail: ['Palanpur Jn (PNU)'] },
      { name: 'Valsad', tier: 'Tier 3', airport: 'Surat Airport (90 km)', airportCode: 'STV', rail: ['Valsad (BL)'] },
      { name: 'Vapi', tier: 'Tier 2', airport: 'Surat Airport (100 km) / Daman', airportCode: 'STV', rail: ['Vapi (VAPI)'], indexable: true },
      { name: 'Gondal', tier: 'Tier 3', airport: 'Rajkot Airport (40 km)', airportCode: 'HSR', rail: ['Gondal (GDL)'] },
      { name: 'Veraval (Somnath)', tier: 'Tier 3', airport: 'Diu Airport (85 km)', airportCode: 'DIU', rail: ['Veraval (VRL)'] }
    ]
  },
  {
    state: 'Kerala',
    stateSlug: 'kerala',
    region: 'South India',
    capital: 'Thiruvananthapuram',
    cities: [
      { name: 'Kochi (Cochin)', tier: 'Tier 1/major urban market', airport: 'Cochin International Airport', airportCode: 'COK', rail: ['Ernakulam Jn (ERS)', 'Ernakulam Town (ERN)'], indexable: true },
      { name: 'Thiruvananthapuram', tier: 'Tier 2', airport: 'Trivandrum International Airport', airportCode: 'TRV', rail: ['Thiruvananthapuram Central (TVC)'], indexable: true },
      { name: 'Kozhikode (Calicut)', tier: 'Tier 2', airport: 'Calicut International Airport', airportCode: 'CCJ', rail: ['Kozhikode Main (CLT)'], indexable: true },
      { name: 'Kollam', tier: 'Tier 2', airport: 'TRV Airport (65 km)', airportCode: 'TRV', rail: ['Kollam Jn (QLN)'], indexable: true },
      { name: 'Thrissur', tier: 'Tier 2', airport: 'COK Airport (55 km)', airportCode: 'COK', rail: ['Thrissur (TCR)'], indexable: true },
      { name: 'Kannur', tier: 'Tier 2', airport: 'Kannur International Airport', airportCode: 'CNN', rail: ['Kannur (CAN)'], indexable: true },
      { name: 'Alappuzha (Alleppey)', tier: 'Tier 2', airport: 'COK Airport (85 km)', airportCode: 'COK', rail: ['Alappuzha (ALLP)'], indexable: true },
      { name: 'Kottayam', tier: 'Tier 3', airport: 'COK Airport (80 km)', airportCode: 'COK', rail: ['Kottayam (KTYM)'] },
      { name: 'Palakkad', tier: 'Tier 3', airport: 'Coimbatore Airport (55 km)', airportCode: 'CJB', rail: ['Palakkad Jn (PGT)'] },
      { name: 'Manjeri', tier: 'Tier 3', airport: 'Calicut Airport (25 km)', airportCode: 'CCJ', rail: ['Angadippuram'] },
      { name: 'Thalassery', tier: 'Tier 3', airport: 'Kannur Airport (25 km)', airportCode: 'CNN', rail: ['Thalassery (TLY)'] },
      { name: 'Ponnani', tier: 'Tier 3', airport: 'Calicut Airport (50 km)', airportCode: 'CCJ', rail: ['Tirur (TIR)'] },
      { name: 'Kasaragod', tier: 'Tier 3', airport: 'Mangaluru Airport (55 km)', airportCode: 'IXE', rail: ['Kasaragod (KGQ)'] },
      { name: 'Kayamkulam', tier: 'Tier 3', airport: 'TRV Airport (100 km)', airportCode: 'TRV', rail: ['Kayamkulam Jn (KYJ)'] },
      { name: 'Malappuram', tier: 'Tier 3', airport: 'Calicut Airport (25 km)', airportCode: 'CCJ', rail: ['Angadippuram'] }
    ]
  },
  {
    state: 'West Bengal',
    stateSlug: 'west-bengal',
    region: 'East & North-East',
    capital: 'Kolkata',
    cities: [
      { name: 'Kolkata', tier: 'Tier 1', airport: 'Netaji Subhash Chandra Bose Int Airport', airportCode: 'CCU', rail: ['Howrah (HWH)', 'Sealdah (SDAH)', 'Kolkata (KOAA)'], indexable: true },
      { name: 'Siliguri', tier: 'Tier 2', airport: 'Bagdogra International Airport', airportCode: 'IXB', rail: ['New Jalpaiguri (NJP)', 'Siliguri Jn (SGUJ)'], indexable: true },
      { name: 'Asansol', tier: 'Tier 2', airport: 'Kazi Nazrul Islam Airport (Durgapur)', airportCode: 'RDP', rail: ['Asansol Jn (ASN)'], indexable: true },
      { name: 'Durgapur', tier: 'Tier 2', airport: 'Kazi Nazrul Islam Airport', airportCode: 'RDP', rail: ['Durgapur (DGR)'], indexable: true },
      { name: 'Bardhaman', tier: 'Tier 3', airport: 'Kolkata / Durgapur', airportCode: 'CCU', rail: ['Barddhaman Jn (BWN)'] },
      { name: 'Malda', tier: 'Tier 3', airport: 'Malda Airport', airportCode: 'CCU', rail: ['Malda Town (MLDT)'] },
      { name: 'Baharampur', tier: 'Tier 3', airport: 'Kolkata Airport (190 km)', airportCode: 'CCU', rail: ['Berhampore Court (BPC)'] },
      { name: 'Habra', tier: 'Tier 3', airport: 'CCU Airport (35 km)', airportCode: 'CCU', rail: ['Habra (HB)'] },
      { name: 'Kharagpur', tier: 'Tier 3', airport: 'Kolkata Airport (130 km)', airportCode: 'CCU', rail: ['Kharagpur Jn (KGP)'] },
      { name: 'Shantipur', tier: 'Tier 3', airport: 'CCU Airport (80 km)', airportCode: 'CCU', rail: ['Santipur (STB)'] },
      { name: 'Dankuni', tier: 'Tier 3', airport: 'CCU Airport (20 km)', airportCode: 'CCU', rail: ['Dankuni (DKAE)'] },
      { name: 'Haldia', tier: 'Tier 3', airport: 'Kolkata Airport (125 km)', airportCode: 'CCU', rail: ['Haldia (HLZ)'] },
      { name: 'Darjeeling', tier: 'Tier 3', airport: 'Bagdogra Airport (70 km)', airportCode: 'IXB', rail: ['New Jalpaiguri (NJP)'] },
      { name: 'Kalimpong', tier: 'Tier 3', airport: 'Bagdogra Airport (75 km)', airportCode: 'IXB', rail: ['New Jalpaiguri (NJP)'] }
    ]
  },
  {
    state: 'Telangana',
    stateSlug: 'telangana',
    region: 'South India',
    capital: 'Hyderabad',
    cities: [
      { name: 'Hyderabad', tier: 'Tier 1', airport: 'Rajiv Gandhi International Airport', airportCode: 'HYD', rail: ['Secunderabad (SC)', 'Hyderabad Deccan (HYB)', 'Kacheguda (KCG)'], indexable: true },
      { name: 'Warangal', tier: 'Tier 2', airport: 'HYD Airport (160 km) / Mamnoor', airportCode: 'HYD', rail: ['Warangal (WL)', 'Kazipet Jn (KZJ)'], indexable: true },
      { name: 'Nizamabad', tier: 'Tier 2', airport: 'HYD Airport (190 km)', airportCode: 'HYD', rail: ['Nizamabad Jn (NZB)'] },
      { name: 'Karimnagar', tier: 'Tier 2', airport: 'HYD Airport (180 km)', airportCode: 'HYD', rail: ['Karimnagar (KRMR)'] },
      { name: 'Ramagundam', tier: 'Tier 3', airport: 'HYD Airport (240 km)', airportCode: 'HYD', rail: ['Ramagundam (RDM)'] },
      { name: 'Khammam', tier: 'Tier 3', airport: 'Vijayawada Airport (130 km) / HYD', airportCode: 'VGA', rail: ['Khammam (KMT)'] },
      { name: 'Mahbubnagar', tier: 'Tier 3', airport: 'HYD Airport (85 km)', airportCode: 'HYD', rail: ['Mahbubnagar (MBNR)'] },
      { name: 'Nalgonda', tier: 'Tier 3', airport: 'HYD Airport (100 km)', airportCode: 'HYD', rail: ['Nalgonda (NLDA)'] },
      { name: 'Adilabad', tier: 'Tier 3', airport: 'Nagpur Airport (185 km)', airportCode: 'NAG', rail: ['Adilabad (ADB)'] },
      { name: 'Siddipet', tier: 'Tier 3', airport: 'HYD Airport (115 km)', airportCode: 'HYD', rail: ['Siddipet'] }
    ]
  },
  {
    state: 'Rajasthan',
    stateSlug: 'rajasthan',
    region: 'North India',
    capital: 'Jaipur',
    cities: [
      { name: 'Jaipur', tier: 'Tier 2', airport: 'Jaipur International Airport', airportCode: 'JAI', rail: ['Jaipur Jn (JP)', 'Gandhinagar Jaipur (GADJ)'], indexable: true },
      { name: 'Jodhpur', tier: 'Tier 2', airport: 'Jodhpur Airport', airportCode: 'JDH', rail: ['Jodhpur Jn (JU)'], indexable: true },
      { name: 'Udaipur', tier: 'Tier 2', airport: 'Maharana Pratap Airport (Dabok)', airportCode: 'UDR', rail: ['Udaipur City (UDZ)'], indexable: true },
      { name: 'Kota', tier: 'Tier 2', airport: 'Kota Airport', airportCode: 'KTU', rail: ['Kota Jn (KOTA)'], indexable: true },
      { name: 'Bikaner', tier: 'Tier 2', airport: 'Nal Airport', airportCode: 'BKB', rail: ['Bikaner Jn (BKN)'], indexable: true },
      { name: 'Ajmer', tier: 'Tier 2', airport: 'Kishangarh Airport (KQH)', airportCode: 'KQH', rail: ['Ajmer Jn (AII)'], indexable: true },
      { name: 'Bhilwara', tier: 'Tier 3', airport: 'Udaipur Airport (135 km)', airportCode: 'UDR', rail: ['Bhilwara (BHL)'] },
      { name: 'Alwar', tier: 'Tier 3', airport: 'DEL Airport (140 km) / Jaipur', airportCode: 'DEL', rail: ['Alwar Jn (AWR)'] },
      { name: 'Bharatpur', tier: 'Tier 3', airport: 'Agra Airport (55 km)', airportCode: 'AGR', rail: ['Bharatpur Jn (BTE)'] },
      { name: 'Sikar', tier: 'Tier 3', airport: 'Jaipur Airport (125 km)', airportCode: 'JAI', rail: ['Sikar Jn (SIKR)'] },
      { name: 'Pali', tier: 'Tier 3', airport: 'Jodhpur Airport (70 km)', airportCode: 'JDH', rail: ['Pali Marwar (PMY)'] },
      { name: 'Sri Ganganagar', tier: 'Tier 3', airport: 'Bathinda Airport (130 km)', airportCode: 'BTI', rail: ['Shri Ganganagar (SGNR)'] },
      { name: 'Kishangarh', tier: 'Tier 3', airport: 'Kishangarh Airport', airportCode: 'KQH', rail: ['Kishangarh (KSG)'] },
      { name: 'Mount Abu', tier: 'Tier 3', airport: 'Udaipur Airport (165 km) / Ahmedabad', airportCode: 'UDR', rail: ['Abu Road (ABR)'] },
      { name: 'Jaisalmer', tier: 'Tier 3', airport: 'Jaisalmer Airport', airportCode: 'JSA', rail: ['Jaisalmer (JSM)'] },
      { name: 'Barmer', tier: 'Tier 3', airport: 'Jodhpur Airport (200 km) / Uttarlai', airportCode: 'JDH', rail: ['Barmer (BME)'] },
      { name: 'Chittorgarh', tier: 'Tier 3', airport: 'Udaipur Airport (90 km)', airportCode: 'UDR', rail: ['Chittaurgarh Jn (COR)'] },
      { name: 'Beawar', tier: 'Tier 3', airport: 'Kishangarh Airport (65 km)', airportCode: 'KQH', rail: ['Beawar (BER)'] }
    ]
  },
  {
    state: 'Madhya Pradesh',
    stateSlug: 'madhya-pradesh',
    region: 'Central India',
    capital: 'Bhopal',
    cities: [
      { name: 'Indore', tier: 'Tier 2', airport: 'Devi Ahilyabai Holkar Airport', airportCode: 'IDR', rail: ['Indore Jn (INDB)'], indexable: true },
      { name: 'Bhopal', tier: 'Tier 2', airport: 'Raja Bhoj Airport', airportCode: 'BHO', rail: ['Bhopal Jn (BPL)', 'Rani Kamlapati (RKMP)'], indexable: true },
      { name: 'Jabalpur', tier: 'Tier 2', airport: 'Dumna Airport', airportCode: 'JLR', rail: ['Jabalpur (JBP)'], indexable: true },
      { name: 'Gwalior', tier: 'Tier 2', airport: 'Rajmata Vijaya Raje Scindia Airport', airportCode: 'GWL', rail: ['Gwalior Jn (GWL)'], indexable: true },
      { name: 'Ujjain', tier: 'Tier 2', airport: 'Indore Airport (55 km)', airportCode: 'IDR', rail: ['Ujjain Jn (UJN)'], indexable: true },
      { name: 'Sagar', tier: 'Tier 3', airport: 'Bhopal / Jabalpur Airport', airportCode: 'BHO', rail: ['Saugor (SGO)'] },
      { name: 'Dewas', tier: 'Tier 3', airport: 'Indore Airport (40 km)', airportCode: 'IDR', rail: ['Dewas (DWX)'] },
      { name: 'Satna', tier: 'Tier 3', airport: 'Khajuraho Airport (120 km)', airportCode: 'HJR', rail: ['Satna (STA)'] },
      { name: 'Ratlam', tier: 'Tier 3', airport: 'Indore Airport (135 km)', airportCode: 'IDR', rail: ['Ratlam Jn (RTM)'] },
      { name: 'Rewa', tier: 'Tier 3', airport: 'Rewa Airport', airportCode: 'REW', rail: ['Rewa (REWA)'] },
      { name: 'Murwara (Katni)', tier: 'Tier 3', airport: 'Jabalpur Airport (95 km)', airportCode: 'JLR', rail: ['Katni Jn (KTE)'] },
      { name: 'Singrauli', tier: 'Tier 3', airport: 'Varanasi Airport (220 km)', airportCode: 'VNS', rail: ['Singrauli (SGRL)'] },
      { name: 'Burhanpur', tier: 'Tier 3', airport: 'Jalgaon / Indore Airport', airportCode: 'IDR', rail: ['Burhanpur (BAU)'] },
      { name: 'Khandwa', tier: 'Tier 3', airport: 'Indore Airport (130 km)', airportCode: 'IDR', rail: ['Khandwa Jn (KNW)'] },
      { name: 'Khajuraho', tier: 'Tier 3', airport: 'Khajuraho Airport', airportCode: 'HJR', rail: ['Khajuraho (KURJ)'] }
    ]
  },
  {
    state: 'Andhra Pradesh',
    stateSlug: 'andhra-pradesh',
    region: 'South India',
    capital: 'Amaravati',
    cities: [
      { name: 'Visakhapatnam', tier: 'Tier 2', airport: 'Visakhapatnam International Airport', airportCode: 'VTZ', rail: ['Visakhapatnam (VSKP)'], indexable: true },
      { name: 'Vijayawada', tier: 'Tier 2', airport: 'Vijayawada International Airport', airportCode: 'VGA', rail: ['Vijayawada Jn (BZA)'], indexable: true },
      { name: 'Guntur', tier: 'Tier 2', airport: 'Vijayawada Airport (50 km)', airportCode: 'VGA', rail: ['Guntur Jn (GNT)'], indexable: true },
      { name: 'Nellore', tier: 'Tier 2', airport: 'Tirupati (125 km) / Chennai', airportCode: 'TIR', rail: ['Nellore (NLR)'] },
      { name: 'Kurnool', tier: 'Tier 3', airport: 'Uyyalawada Narasimha Reddy Airport', airportCode: 'KJB', rail: ['Kurnool City (KU)'] },
      { name: 'Rajahmundry', tier: 'Tier 2', airport: 'Rajahmundry Airport (Madhurapudi)', airportCode: 'RJA', rail: ['Rajahmundry (RJY)'], indexable: true },
      { name: 'Tirupati', tier: 'Tier 2', airport: 'Tirupati International Airport', airportCode: 'TIR', rail: ['Tirupati (TPTY)', 'Renigunta (RU)'], indexable: true },
      { name: 'Kadapa', tier: 'Tier 3', airport: 'Kadapa Airport', airportCode: 'CDP', rail: ['Cuddapah (HX)'] },
      { name: 'Kakinada', tier: 'Tier 3', airport: 'Rajahmundry Airport (60 km)', airportCode: 'RJA', rail: ['Kakinada Town (CCT)'] },
      { name: 'Anantapur', tier: 'Tier 3', airport: 'BLR Airport (190 km)', airportCode: 'BLR', rail: ['Anantapur (ATP)'] },
      { name: 'Vizianagaram', tier: 'Tier 3', airport: 'Visakhapatnam Airport (60 km)', airportCode: 'VTZ', rail: ['Vizianagaram Jn (VZM)'] },
      { name: 'Eluru', tier: 'Tier 3', airport: 'Vijayawada Airport (40 km)', airportCode: 'VGA', rail: ['Eluru (EE)'] },
      { name: 'Ongole', tier: 'Tier 3', airport: 'Vijayawada Airport (150 km)', airportCode: 'VGA', rail: ['Ongole (OGL)'] }
    ]
  },
  {
    state: 'Bihar',
    stateSlug: 'bihar',
    region: 'East & North-East',
    capital: 'Patna',
    cities: [
      { name: 'Patna', tier: 'Tier 2', airport: 'Jay Prakash Narayan Airport', airportCode: 'PAT', rail: ['Patna Jn (PNBE)', 'Rajendra Nagar (RJPB)'], indexable: true },
      { name: 'Gaya', tier: 'Tier 2', airport: 'Gaya International Airport', airportCode: 'GAY', rail: ['Gaya Jn (GAYA)'], indexable: true },
      { name: 'Bhagalpur', tier: 'Tier 2', airport: 'Patna / Deoghar Airport', airportCode: 'PAT', rail: ['Bhagalpur (BGP)'] },
      { name: 'Muzaffarpur', tier: 'Tier 2', airport: 'Patna (75 km) / Darbhanga (65 km)', airportCode: 'PAT', rail: ['Muzaffarpur Jn (MFP)'], indexable: true },
      { name: 'Darbhanga', tier: 'Tier 2', airport: 'Darbhanga Airport', airportCode: 'DBR', rail: ['Darbhanga Jn (DBG)'], indexable: true },
      { name: 'Bihar Sharif', tier: 'Tier 3', airport: 'Patna Airport (70 km)', airportCode: 'PAT', rail: ['Bihar Sharif (BEHS)'] },
      { name: 'Purnia', tier: 'Tier 3', airport: 'Bagdogra Airport (160 km)', airportCode: 'IXB', rail: ['Purnea Jn (PRNA)'] },
      { name: 'Arrah', tier: 'Tier 3', airport: 'Patna Airport (55 km)', airportCode: 'PAT', rail: ['Ara Jn (ARA)'] },
      { name: 'Begusarai', tier: 'Tier 3', airport: 'Patna Airport (125 km)', airportCode: 'PAT', rail: ['Barauni Jn (BJU)'] },
      { name: 'Katihar', tier: 'Tier 3', airport: 'Bagdogra Airport (170 km)', airportCode: 'IXB', rail: ['Katihar Jn (KIR)'] },
      { name: 'Munger', tier: 'Tier 3', airport: 'Deoghar Airport (110 km)', airportCode: 'DGH', rail: ['Jamalpur Jn (JMP)'] },
      { name: 'Chhapra', tier: 'Tier 3', airport: 'Patna Airport (65 km)', airportCode: 'PAT', rail: ['Chhapra Jn (CPR)'] }
    ]
  },
  {
    state: 'Odisha',
    stateSlug: 'odisha',
    region: 'East & North-East',
    capital: 'Bhubaneswar',
    cities: [
      { name: 'Bhubaneswar', tier: 'Tier 2', airport: 'Biju Patnaik International Airport', airportCode: 'BBI', rail: ['Bhubaneswar (BBS)'], indexable: true },
      { name: 'Cuttack', tier: 'Tier 2', airport: 'BBI Airport (30 km)', airportCode: 'BBI', rail: ['Cuttack (CTC)'], indexable: true },
      { name: 'Rourkela', tier: 'Tier 2', airport: 'Rourkela Airport', airportCode: 'RRK', rail: ['Rourkela (ROU)'], indexable: true },
      { name: 'Berhampur', tier: 'Tier 3', airport: 'Bhubaneswar Airport (170 km) / Rangeilunda', airportCode: 'BBI', rail: ['Brahmapur (BAM)'] },
      { name: 'Sambalpur', tier: 'Tier 3', airport: 'Jharsuguda Airport (60 km)', airportCode: 'JRG', rail: ['Sambalpur (SBP)'] },
      { name: 'Puri', tier: 'Tier 2', airport: 'Bhubaneswar Airport (60 km)', airportCode: 'BBI', rail: ['Puri (PURI)'], indexable: true },
      { name: 'Balasore', tier: 'Tier 3', airport: 'Bhubaneswar / Kolkata', airportCode: 'BBI', rail: ['Balasore (BLS)'] },
      { name: 'Bhadrak', tier: 'Tier 3', airport: 'Bhubaneswar Airport (130 km)', airportCode: 'BBI', rail: ['Bhadrak (BHC)'] },
      { name: 'Jharsuguda', tier: 'Tier 3', airport: 'Veer Surendra Sai Airport', airportCode: 'JRG', rail: ['Jharsuguda Jn (JSG)'] }
    ]
  },
  {
    state: 'Jharkhand',
    stateSlug: 'jharkhand',
    region: 'East & North-East',
    capital: 'Ranchi',
    cities: [
      { name: 'Ranchi', tier: 'Tier 2', airport: 'Birsa Munda Airport', airportCode: 'IXR', rail: ['Ranchi (RNC)', 'Hatia (HTE)'], indexable: true },
      { name: 'Jamshedpur', tier: 'Tier 2', airport: 'Sonari / Ranchi Airport (130 km)', airportCode: 'IXR', rail: ['Tatanagar Jn (TATA)'], indexable: true },
      { name: 'Dhanbad', tier: 'Tier 2', airport: 'Durgapur Airport (90 km) / Ranchi', airportCode: 'RDP', rail: ['Dhanbad Jn (DHN)'], indexable: true },
      { name: 'Bokaro Steel City', tier: 'Tier 2', airport: 'Upcoming Bokaro Airport / Ranchi', airportCode: 'IXR', rail: ['Bokaro Steel City (BKSC)'], indexable: true },
      { name: 'Deoghar', tier: 'Tier 3', airport: 'Deoghar Airport (Baba Baidyanath)', airportCode: 'DGH', rail: ['Jasidih Jn (JSME)'] },
      { name: 'Hazaribagh', tier: 'Tier 3', airport: 'Ranchi Airport (95 km)', airportCode: 'IXR', rail: ['Hazaribagh Town (HZBN)'] },
      { name: 'Giridih', tier: 'Tier 3', airport: 'Deoghar Airport (65 km)', airportCode: 'DGH', rail: ['Giridih (GRD)'] },
      { name: 'Ramgarh', tier: 'Tier 3', airport: 'Ranchi Airport (50 km)', airportCode: 'IXR', rail: ['Ramgarh Cantt (RMT)'] }
    ]
  },
  {
    state: 'Assam & North East States',
    stateSlug: 'north-east',
    region: 'East & North-East',
    capital: 'Guwahati / Shillong',
    cities: [
      { name: 'Guwahati', state: 'Assam', stateSlug: 'assam', tier: 'Tier 2', airport: 'Lokpriya Gopinath Bordoloi Int Airport', airportCode: 'GAU', rail: ['Guwahati (GHY)', 'Kamakhya (KYQ)'], indexable: true },
      { name: 'Silchar', state: 'Assam', stateSlug: 'assam', tier: 'Tier 3', airport: 'Silchar Airport (Kumbhirgram)', airportCode: 'IXS', rail: ['Silchar (SCL)'] },
      { name: 'Dibrugarh', state: 'Assam', stateSlug: 'assam', tier: 'Tier 2', airport: 'Dibrugarh Airport (Mohanbari)', airportCode: 'DIB', rail: ['Dibrugarh (DBRG)'], indexable: true },
      { name: 'Jorhat', state: 'Assam', stateSlug: 'assam', tier: 'Tier 3', airport: 'Jorhat Airport (Rowriah)', airportCode: 'JRH', rail: ['Jorhat Town (JTTN)'] },
      { name: 'Nagaon', state: 'Assam', stateSlug: 'assam', tier: 'Tier 3', airport: 'Guwahati Airport (125 km)', airportCode: 'GAU', rail: ['Nagaon (NGAN)'] },
      { name: 'Tezpur', state: 'Assam', stateSlug: 'assam', tier: 'Tier 3', airport: 'Tezpur Airport (Salonibari)', airportCode: 'TEZ', rail: ['Dekargaon (DKGN)'] },
      { name: 'Shillong', state: 'Meghalaya', stateSlug: 'meghalaya', tier: 'Tier 2', airport: 'Umroi Airport (SHL) / Guwahati (GAU)', airportCode: 'SHL', rail: ['Guwahati (100 km)'], indexable: true },
      { name: 'Cherrapunji (Sohra)', state: 'Meghalaya', stateSlug: 'meghalaya', tier: 'Tier 3', airport: 'Guwahati Airport (150 km)', airportCode: 'GAU', rail: ['Guwahati'] },
      { name: 'Tura', state: 'Meghalaya', stateSlug: 'meghalaya', tier: 'Tier 3', airport: 'Guwahati (220 km) / Baljek', airportCode: 'GAU', rail: ['Mendipathar'] },
      { name: 'Agartala', state: 'Tripura', stateSlug: 'tripura', tier: 'Tier 2', airport: 'Maharaja Bir Bikram Airport', airportCode: 'IXA', rail: ['Agartala (AGTL)'], indexable: true },
      { name: 'Imphal', state: 'Manipur', stateSlug: 'manipur', tier: 'Tier 2', airport: 'Bir Tikendrajit Int Airport', airportCode: 'IMF', rail: ['Dimapur (200 km)'], indexable: true },
      { name: 'Aizawl', state: 'Mizoram', stateSlug: 'mizoram', tier: 'Tier 3', airport: 'Lengpui Airport', airportCode: 'AJL', rail: ['Bairabi (130 km)'] },
      { name: 'Kohima', state: 'Nagaland', stateSlug: 'nagaland', tier: 'Tier 3', airport: 'Dimapur Airport (74 km)', airportCode: 'DMU', rail: ['Dimapur (DMV)'] },
      { name: 'Dimapur', state: 'Nagaland', stateSlug: 'nagaland', tier: 'Tier 3', airport: 'Dimapur Airport', airportCode: 'DMU', rail: ['Dimapur (DMV)'] },
      { name: 'Gangtok', state: 'Sikkim', stateSlug: 'sikkim', tier: 'Tier 2', airport: 'Pakyong Airport (PYG) / Bagdogra (IXB)', airportCode: 'PYG', rail: ['New Jalpaiguri (120 km)'], indexable: true },
      { name: 'Itanagar', state: 'Arunachal Pradesh', stateSlug: 'arunachal-pradesh', tier: 'Tier 3', airport: 'Donyi Polo Airport (Hollongi)', airportCode: 'HGI', rail: ['Naharlagun (NHL)'] }
    ]
  },
  {
    state: 'Uttarakhand & Himachal Pradesh',
    stateSlug: 'himalayan-states',
    region: 'North India',
    capital: 'Dehradun / Shimla',
    cities: [
      { name: 'Dehradun', state: 'Uttarakhand', stateSlug: 'uttarakhand', tier: 'Tier 2', airport: 'Jolly Grant Airport', airportCode: 'DED', rail: ['Dehradun (DDN)'], indexable: true },
      { name: 'Haridwar', state: 'Uttarakhand', stateSlug: 'uttarakhand', tier: 'Tier 2', airport: 'Jolly Grant Airport (40 km)', airportCode: 'DED', rail: ['Haridwar (HW)'], indexable: true },
      { name: 'Rishikesh', state: 'Uttarakhand', stateSlug: 'uttarakhand', tier: 'Tier 2', airport: 'Jolly Grant Airport (20 km)', airportCode: 'DED', rail: ['Yog Nagari Rishikesh (YNRK)'], indexable: true },
      { name: 'Haldwani-Kathgodam', state: 'Uttarakhand', stateSlug: 'uttarakhand', tier: 'Tier 2', airport: 'Pantnagar Airport (28 km)', airportCode: 'PGH', rail: ['Kathgodam (KGM)'], indexable: true },
      { name: 'Roorkee', state: 'Uttarakhand', stateSlug: 'uttarakhand', rail: ['Roorkee (RK)'], tier: 'Tier 3', airport: 'Jolly Grant Airport (70 km)', airportCode: 'DED' },
      { name: 'Nainital', state: 'Uttarakhand', stateSlug: 'uttarakhand', rail: ['Kathgodam (35 km)'], tier: 'Tier 3', airport: 'Pantnagar Airport (65 km)', airportCode: 'PGH' },
      { name: 'Mussoorie', state: 'Uttarakhand', stateSlug: 'uttarakhand', rail: ['Dehradun (35 km)'], tier: 'Tier 3', airport: 'Jolly Grant (60 km)', airportCode: 'DED' },
      { name: 'Shimla', state: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', tier: 'Tier 2', airport: 'Shimla Airport (Jubbarhatti)', airportCode: 'SLV', rail: ['Shimla (SML)'], indexable: true },
      { name: 'Manali', state: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', tier: 'Tier 2', airport: 'Kullu Manali Airport (Bhuntar)', airportCode: 'KUU', rail: ['Chandigarh (300 km)'], indexable: true },
      { name: 'Dharamshala', state: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', tier: 'Tier 2', airport: 'Kangra Airport (Gaggal)', airportCode: 'DHM', rail: ['Pathankot (85 km)'], indexable: true },
      { name: 'Solan', state: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', tier: 'Tier 3', airport: 'Chandigarh / Shimla', airportCode: 'IXC', rail: ['Solan (SOL)'] },
      { name: 'Mandi', state: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', tier: 'Tier 3', airport: 'Bhuntar Airport (60 km)', airportCode: 'KUU', rail: ['Kiratpur Sahib (125 km)'] }
    ]
  },
  {
    state: 'Jammu & Kashmir and Ladakh',
    stateSlug: 'jammu-kashmir',
    region: 'North India',
    capital: 'Srinagar / Jammu',
    cities: [
      { name: 'Srinagar', state: 'Jammu and Kashmir', stateSlug: 'jammu-kashmir', tier: 'Tier 2', airport: 'Sheikh ul-Alam International Airport', airportCode: 'SXR', rail: ['Srinagar (SINA)'], indexable: true },
      { name: 'Jammu', state: 'Jammu and Kashmir', stateSlug: 'jammu-kashmir', tier: 'Tier 2', airport: 'Jammu Airport (Satwari)', airportCode: 'IXJ', rail: ['Jammu Tawi (JAT)'], indexable: true },
      { name: 'Leh', state: 'Ladakh', stateSlug: 'ladakh', tier: 'Tier 2', airport: 'Kushok Bakula Rimpochee Airport', airportCode: 'IXL', rail: ['Jammu (700 km)'], indexable: true },
      { name: 'Kargil', state: 'Ladakh', stateSlug: 'ladakh', tier: 'Tier 3', airport: 'Srinagar / Leh Airport', airportCode: 'IXL', rail: ['Srinagar'] }
    ]
  },
  {
    state: 'Goa',
    stateSlug: 'goa',
    region: 'West India',
    capital: 'Panaji',
    cities: [
      { name: 'Panaji', tier: 'Tier 2', airport: 'Dabolim (GOI) / Manohar Mopa (GOX)', airportCode: 'GOI', rail: ['Karmali (KRMI)', 'Thivim (THVM)'], indexable: true },
      { name: 'Margao', tier: 'Tier 2', airport: 'Dabolim Airport (25 km)', airportCode: 'GOI', rail: ['Madgaon Jn (MAO)'], indexable: true },
      { name: 'Vasco da Gama', tier: 'Tier 3', airport: 'Dabolim Airport (5 km)', airportCode: 'GOI', rail: ['Vasco Da Gama (VSG)'] },
      { name: 'Mapusa', tier: 'Tier 3', airport: 'Manohar Mopa Airport (20 km)', airportCode: 'GOX', rail: ['Thivim (THVM)'] }
    ]
  },
  {
    state: 'Chhattisgarh',
    stateSlug: 'chhattisgarh',
    region: 'Central India',
    capital: 'Raipur',
    cities: [
      { name: 'Raipur', tier: 'Tier 2', airport: 'Swami Vivekananda Airport', airportCode: 'RPR', rail: ['Raipur Jn (R)'], indexable: true },
      { name: 'Bhilai', tier: 'Tier 2', airport: 'Raipur Airport (50 km)', airportCode: 'RPR', rail: ['Bhilai Power House (BPHB)'], indexable: true },
      { name: 'Bilaspur', tier: 'Tier 2', airport: 'Bilasa Devi Kevat Airport (Chakarbhatha)', airportCode: 'PAB', rail: ['Bilaspur Jn (BSP)'], indexable: true },
      { name: 'Korba', tier: 'Tier 3', airport: 'Bilaspur (90 km) / Raipur', airportCode: 'PAB', rail: ['Korba (KRBA)'] },
      { name: 'Rajnandgaon', tier: 'Tier 3', airport: 'Raipur Airport (85 km)', airportCode: 'RPR', rail: ['Rajnandgaon (RJN)'] },
      { name: 'Jagdalpur', tier: 'Tier 3', airport: 'Jagdalpur Airport (Maa Danteshwari)', airportCode: 'JGB', rail: ['Jagdalpur (JDB)'] }
    ]
  }
];

// Flatten into comprehensive records
const allCityRecords = [];
let indexableCount = 0;

for (const group of statesData) {
  for (const c of group.cities) {
    const cityName = c.name;
    const rawState = c.state || group.state;
    const stateSlug = c.stateSlug || group.stateSlug;
    const rawSlug = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const isIndexable = Boolean(c.indexable);
    if (isIndexable) indexableCount++;

    const indexabilityStatus = isIndexable ? 'INDEX' : (c.tier.includes('Tier 2') ? 'REVIEW' : 'NOINDEX');

    const record = {
      city: cityName,
      state: rawState,
      stateSlug: stateSlug,
      region: group.region,
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

    allCityRecords.push(record);
  }
}

// Generate the JSON file in client/src/data
const clientCityJsonPath = path.join(__dirname, '..', 'client', 'src', 'data', 'indiaCityDatabase.json');
fs.writeFileSync(clientCityJsonPath, JSON.stringify(allCityRecords, null, 2), 'utf8');

console.log(`Successfully generated ${allCityRecords.length} Indian city records in ${clientCityJsonPath}!`);
console.log(`Indexable cities count: ${indexableCount}`);
