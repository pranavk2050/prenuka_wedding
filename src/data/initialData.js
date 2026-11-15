export const initialData = {
  guests: {
    groomSide: [],
    brideSide: [],
  },
  tasks: [
    // --- Rituals & Ceremonies ---
    { id: 't1',  category: 'Rituals', title: 'Book Brahmin Guruji for Srimant Pujan',           side: 'both',  priority: 'high',   completed: false, dueDate: '2026-12-01', notes: '' },
    { id: 't2',  category: 'Rituals', title: 'Book Brahmin Guruji for Vivah Sohala',            side: 'both',  priority: 'high',   completed: false, dueDate: '2026-12-01', notes: '' },
    { id: 't3',  category: 'Rituals', title: 'Confirm Muhurta timing with Guruji',              side: 'both',  priority: 'high',   completed: false, dueDate: '2026-12-15', notes: 'Target: 10:00 AM on Feb 12' },
    { id: 't4',  category: 'Rituals', title: 'Arrange Antarpath cloth for ceremony',            side: 'bride', priority: 'medium', completed: false, dueDate: '2027-01-15', notes: '' },
    { id: 't5',  category: 'Rituals', title: 'Arrange coconut, mango leaves & kalash',         side: 'groom', priority: 'medium', completed: false, dueDate: '2027-01-15', notes: '' },
    { id: 't6',  category: 'Rituals', title: 'Confirm Mangalashtake singer / performer',       side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-01', notes: '' },
    { id: 't7',  category: 'Rituals', title: 'Prepare dakshina envelopes for priests',         side: 'both',  priority: 'low',    completed: false, dueDate: '2027-02-10', notes: '' },
    { id: 't8',  category: 'Rituals', title: 'Arrange Haladi ceremony materials',              side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-20', notes: '' },
    { id: 't9',  category: 'Rituals', title: 'Arrange Puranpoli & breakfast for wedding morning', side: 'groom', priority: 'low', completed: false, dueDate: '2027-02-10', notes: '' },

    // --- Venue & Logistics ---
    { id: 't10', category: 'Venue',   title: 'Confirm room allocation at Coco Resort (100 rooms)', side: 'both',  priority: 'high',   completed: false, dueDate: '2026-11-30', notes: '50 Pranav side + 50 Renuka side' },
    { id: 't11', category: 'Venue',   title: 'Book 50 rooms – Pranav\'s side',                 side: 'groom', priority: 'high',   completed: false, dueDate: '2026-12-01', notes: 'Feb 11–12 nights' },
    { id: 't12', category: 'Venue',   title: 'Book 50 rooms – Renuka\'s side',                 side: 'bride', priority: 'high',   completed: false, dueDate: '2026-12-01', notes: 'Feb 11–12 nights' },
    { id: 't13', category: 'Venue',   title: 'Arrange shuttle from Pune railway station',      side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-20', notes: '' },
    { id: 't14', category: 'Venue',   title: 'Arrange shuttle from Pune airport',              side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-20', notes: '' },
    { id: 't15', category: 'Venue',   title: 'Confirm check-in / check-out times with resort', side: 'both',  priority: 'low',    completed: false, dueDate: '2027-01-01', notes: '' },
    { id: 't16', category: 'Venue',   title: 'Plan parking arrangements for 300+ guests',     side: 'both',  priority: 'low',    completed: false, dueDate: '2027-01-15', notes: '' },

    // --- Catering ---
    { id: 't17', category: 'Catering', title: 'Finalize caterer for Feb 11 Srimant Pujan & Dinner', side: 'both',  priority: 'high',   completed: false, dueDate: '2026-12-15', notes: '100 pax' },
    { id: 't18', category: 'Catering', title: 'Finalize caterer for Feb 12 Wedding (Lunch)',  side: 'both',  priority: 'high',   completed: false, dueDate: '2026-12-15', notes: '350–400 pax' },
    { id: 't19', category: 'Catering', title: 'Do catering tasting session',                  side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-15', notes: 'Confirm menu items' },
    { id: 't20', category: 'Catering', title: 'Confirm final veg / non-veg headcount',        side: 'both',  priority: 'medium', completed: false, dueDate: '2027-02-05', notes: '' },
    { id: 't21', category: 'Catering', title: 'Arrange welcome drinks & refreshments',        side: 'both',  priority: 'low',    completed: false, dueDate: '2027-02-01', notes: '' },

    // --- Decoration ---
    { id: 't22', category: 'Decoration', title: 'Book floral decorator for mandap',           side: 'both',  priority: 'high',   completed: false, dueDate: '2026-12-01', notes: '' },
    { id: 't23', category: 'Decoration', title: 'Design mandap & stage floral arrangement',  side: 'both',  priority: 'high',   completed: false, dueDate: '2027-01-01', notes: 'Marigold + jasmine + roses' },
    { id: 't24', category: 'Decoration', title: 'Book tent house for dining & reception area', side: 'both',  priority: 'high',   completed: false, dueDate: '2026-12-01', notes: '' },
    { id: 't25', category: 'Decoration', title: 'Arrange marigold garlands (varmala)',        side: 'both',  priority: 'medium', completed: false, dueDate: '2027-02-10', notes: '' },
    { id: 't26', category: 'Decoration', title: 'Plan entrance / gate decoration',            side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-15', notes: '' },
    { id: 't27', category: 'Decoration', title: 'Arrange rangoli artist for Feb 12',          side: 'both',  priority: 'low',    completed: false, dueDate: '2027-01-20', notes: '' },

    // --- Photography ---
    { id: 't28', category: 'Photography', title: 'Book wedding photographer',                 side: 'both',  priority: 'high',   completed: false, dueDate: '2026-11-30', notes: 'Full day coverage' },
    { id: 't29', category: 'Photography', title: 'Book videographer / cinematographer',       side: 'both',  priority: 'high',   completed: false, dueDate: '2026-11-30', notes: '' },
    { id: 't30', category: 'Photography', title: 'Discuss shot list with photographer',       side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-15', notes: '' },
    { id: 't31', category: 'Photography', title: 'Plan pre-wedding photoshoot',               side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-01', notes: '' },
    { id: 't32', category: 'Photography', title: 'Confirm photo delivery timeline',           side: 'both',  priority: 'low',    completed: false, dueDate: '2027-01-15', notes: '' },

    // --- Clothing ---
    { id: 't33', category: 'Clothing', title: 'Select Pranav\'s sherwani / dhoti-kurta',     side: 'groom', priority: 'high',   completed: false, dueDate: '2027-01-01', notes: '' },
    { id: 't34', category: 'Clothing', title: 'Select Renuka\'s wedding saree / nauvari',    side: 'bride', priority: 'high',   completed: false, dueDate: '2027-01-01', notes: 'Marathi Deshasth style nauvari preferred' },
    { id: 't35', category: 'Clothing', title: 'Coordinate family members\' outfit colours',  side: 'both',  priority: 'low',    completed: false, dueDate: '2027-01-15', notes: '' },
    { id: 't36', category: 'Clothing', title: 'Purchase paithani saree for Renuka',          side: 'bride', priority: 'medium', completed: false, dueDate: '2027-01-01', notes: '' },

    // --- Mehendi & Beauty ---
    { id: 't37', category: 'Beauty', title: 'Book mehendi artist for Renuka',                side: 'bride', priority: 'high',   completed: false, dueDate: '2026-12-01', notes: 'Feb 10 or 11 morning' },
    { id: 't38', category: 'Beauty', title: 'Book makeup artist for Renuka (Feb 12)',        side: 'bride', priority: 'high',   completed: false, dueDate: '2026-12-01', notes: 'Trial session needed' },

    // --- Invitations ---
    { id: 't39', category: 'Invitations', title: 'Design Sakharpuda & wedding invitation card', side: 'both',  priority: 'high',   completed: false, dueDate: '2026-12-15', notes: '' },
    { id: 't40', category: 'Invitations', title: 'Send Srimant Pujan invitations to families', side: 'both',  priority: 'high',   completed: false, dueDate: '2027-01-10', notes: '' },
    { id: 't41', category: 'Invitations', title: 'Print & courier physical invite cards',      side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-15', notes: '' },
    { id: 't42', category: 'Invitations', title: 'Create WhatsApp digital invitation',         side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-15', notes: '' },
    { id: 't43', category: 'Invitations', title: 'Follow up RSVP with key guests',             side: 'both',  priority: 'medium', completed: false, dueDate: '2027-02-01', notes: '' },

    // --- Music ---
    { id: 't44', category: 'Music', title: 'Book music / DJ for Sangeet on Feb 11 evening',  side: 'both',  priority: 'high',   completed: false, dueDate: '2026-12-15', notes: '' },
    { id: 't45', category: 'Music', title: 'Share wedding playlist with DJ',                  side: 'both',  priority: 'low',    completed: false, dueDate: '2027-02-01', notes: '' },

    // --- Post-Wedding ---
    { id: 't46', category: 'Miscellaneous', title: 'Book honeymoon hotel',                   side: 'both',  priority: 'medium', completed: false, dueDate: '2027-01-01', notes: '' },
    { id: 't47', category: 'Miscellaneous', title: 'Arrange guest drop-off transport post wedding', side: 'both', priority: 'medium', completed: false, dueDate: '2027-02-01', notes: '' },
    { id: 't48', category: 'Miscellaneous', title: 'Send thank-you gifts & notes to guests', side: 'both',  priority: 'low',    completed: false, dueDate: '2027-03-01', notes: '' },
  ],

  budget: {
    totalBudget: 2500000,
    categories: [
      { id: 'b1',  name: 'Venue & Accommodation',           allocated: 500000,  spent: 0 },
      { id: 'b2',  name: 'Catering – Feb 11 (100 pax)',     allocated: 150000,  spent: 0 },
      { id: 'b3',  name: 'Catering – Feb 12 (350–400 pax)', allocated: 500000,  spent: 0 },
      { id: 'b4',  name: 'Decoration & Florals',            allocated: 250000,  spent: 0 },
      { id: 'b5',  name: 'Photography & Videography',       allocated: 150000,  spent: 0 },
      { id: 'b6',  name: 'Priest & Rituals',                allocated: 50000,   spent: 0 },
      { id: 'b7',  name: 'Music & Entertainment',           allocated: 75000,   spent: 0 },
      { id: 'b8',  name: 'Clothing – Bride',                allocated: 200000,  spent: 0 },
      { id: 'b9',  name: 'Clothing – Groom',                allocated: 75000,   spent: 0 },
      { id: 'b10', name: 'Mehendi & Makeup',                allocated: 50000,   spent: 0 },
      { id: 'b11', name: 'Invitations & Stationery',        allocated: 25000,   spent: 0 },
      { id: 'b12', name: 'Transport & Logistics',           allocated: 75000,   spent: 0 },
      { id: 'b13', name: 'Miscellaneous',                   allocated: 100000,  spent: 0 },
    ],
  },

  vendors: [
    { id: 'v1',  category: 'catering',     name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
    { id: 'v2',  category: 'photography',  name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
    { id: 'v3',  category: 'videography',  name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
    { id: 'v4',  category: 'decor',        name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
    { id: 'v5',  category: 'priest',       name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
    { id: 'v6',  category: 'music',        name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
    { id: 'v7',  category: 'tent',         name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
    { id: 'v8',  category: 'mehendi',      name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
    { id: 'v9',  category: 'makeup',       name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
    { id: 'v10', category: 'transport',    name: '', contact: '', phone: '', amount: 0, advancePaid: 0, status: 'not_started', notes: '' },
  ],

  schedule: {
    feb11: [
      { id: 's11_1', time: '14:00', title: 'Arrival & Check-in',           subtitle: '',               duration: 120, location: 'Coco Resort Lobby',   description: 'Guests arrive between 2–4 PM and check in to their rooms. Welcome drinks and refreshments at the lobby.' },
      { id: 's11_2', time: '16:30', title: 'Haladi Ceremony – Renuka',     subtitle: 'हळद — रेणुका',   duration: 60,  location: 'Renuka\'s Suite',      description: 'Turmeric (haldi) ceremony for the bride with family women. Private family event.' },
      { id: 's11_3', time: '17:30', title: 'Haladi Ceremony – Pranav',     subtitle: 'हळद — प्रणव',    duration: 60,  location: 'Pranav\'s Suite',      description: 'Turmeric (haldi) ceremony for the groom with family elders.' },
      { id: 's11_4', time: '19:00', title: 'Srimant Pujan',                subtitle: 'श्रीमंत पूजन',   duration: 90,  location: 'Main Mandap, Resort', description: 'Evening pre-wedding puja ceremony presided by the Guruji. All stay guests attend. Pranav & Renuka receive blessings from both families. Marks the auspicious start of the wedding celebrations.' },
      { id: 's11_5', time: '20:30', title: 'Dinner',                       subtitle: 'रात्रीचे जेवण',  duration: 90,  location: 'Dining Hall / Lawn',   description: 'Dinner for all 100 stay guests following the Srimant Pujan. Traditional Maharashtrian Deshasth menu.' },
      { id: 's11_6', time: '22:00', title: 'Sangeet & Celebrations',       subtitle: 'संगीत सोहळा',    duration: 60,  location: 'Garden / Lawn Area',   description: 'Light music and celebrations after dinner. Family performances and dancing to welcome the wedding day.' },
      { id: 's11_7', time: '23:00', title: 'Wind Down',                    subtitle: '',               duration: 0,   location: 'Resort',               description: 'Evening concludes. Guests retire to rooms for rest before the big day.' },
    ],
    feb12: [
      { id: 's12_1', time: '06:30', title: 'Brahma Muhurta – Morning Puja', subtitle: 'ब्राह्ममुहूर्त', duration: 30,  location: 'Respective Suites',    description: 'Early morning prayers. Bride and groom families perform morning rituals separately.' },
      { id: 's12_2', time: '07:30', title: 'Pranav Gets Ready',            subtitle: 'वर तयारी',       duration: 90,  location: 'Pranav\'s Suite',      description: 'Groom dresses in dhoti-kurta / sherwani. Dhoti-tying ritual with family elders.' },
      { id: 's12_3', time: '08:00', title: 'Vara Satkaar',                 subtitle: 'वरसत्कार',       duration: 45,  location: 'Resort Entrance',      description: 'Welcoming of the groom\'s baraat / procession by the bride\'s family. Formal reception with flowers and tika.' },
      { id: 's12_4', time: '09:00', title: 'Antarpat Ceremony',            subtitle: 'अंतरपाट',        duration: 30,  location: 'Mandap',               description: 'Sacred cloth (antarpat) is held between bride and groom. The auspicious chanting begins. Renuka enters in her nauvari saree.' },
      { id: 's12_5', time: '10:00', title: 'Vivah Muhurta – Main Ceremony', subtitle: 'विवाह मुहूर्त', duration: 90,  location: 'Mandap',               description: 'Main wedding ceremony. Mangalashtake, Saptapadi (seven vows), Sindoor, Mangalsutra. Presided by Guruji.' },
      { id: 's12_6', time: '11:30', title: 'Varmala – Garland Exchange',   subtitle: 'वरमाला',         duration: 20,  location: 'Mandap',               description: 'Exchange of garlands by the couple. Photo opportunity.' },
      { id: 's12_7', time: '12:00', title: 'Family Blessings & Photos',    subtitle: 'आशीर्वाद',       duration: 60,  location: 'Mandap / Garden',      description: 'Group photographs with both families. Elders give blessings to the couple.' },
      { id: 's12_8', time: '13:00', title: 'Wedding Lunch',                subtitle: 'भोजन',           duration: 120, location: 'Main Dining Hall',     description: 'Lunch reception for 350–400 guests. Traditional Maharashtrian Deshasth menu. Couple sits at the head table.' },
      { id: 's12_9', time: '15:30', title: 'Vidaai Ceremony',              subtitle: 'निरोप',          duration: 60,  location: 'Resort Entrance',      description: 'Emotional farewell ceremony. Renuka departs with Pranav\'s family. Rice throwing ritual.' },
      { id: 's12_10', time: '16:30', title: 'Guest Departure',             subtitle: '',               duration: 60,  location: 'Resort',               description: 'Shuttle service arranged for guests heading to Pune station/airport.' },
    ],
  },

  venue: {
    name: 'Coco Resort',
    address: 'Survey No. 23, Behind D-Mart, Wakad-Hinjewadi Road, Punawale, Pune – 411033',
    phone: '+91 20 XXXX XXXX',
    email: 'events@cocoresortpune.com',
    website: '',
    contactPerson: 'Events Manager',
    checkIn: 'Feb 11, 2027 – 2:00 PM',
    checkOut: 'Feb 13, 2027 – 11:00 AM',
    stayRooms: 100,
    eventCapacity: 500,
    notes: 'Garden lawn available for sangeet. Main hall for dining. Mandap setup by decorator.',
  },
}
