// Pure HTML/CSS/JS - No external dependencies
// All data is stored locally in this file

// Mock Data for Fund Information (Simulates Cashbook API Response)
// In production, this data comes from Cashbook/Enkash API
const FUND_DATA = {
    CB2025001: {
        fundsRaised: 85000,
        expenses: 62000,
        remainingBalance: 23000,
        transactions: [
            { id: '1', date: '2025-09-01', description: 'Student Union Fund Allocation', type: 'income', amount: 50000, category: 'Union Budget' },
            { id: '2', date: '2025-09-15', description: 'Corporate Sponsorship - TCS', type: 'income', amount: 25000, category: 'Sponsorship' },
            { id: '3', date: '2025-09-20', description: 'Student Donations', type: 'income', amount: 10000, category: 'Donations' },
            { id: '4', date: '2025-10-01', description: 'Stage & Sound System', type: 'expense', amount: 20000, category: 'Infrastructure' },
            { id: '5', date: '2025-10-05', description: 'Celebrity Performance', type: 'expense', amount: 30000, category: 'Entertainment' },
            { id: '6', date: '2025-10-08', description: 'Food & Catering', type: 'expense', amount: 12000, category: 'Catering' },
        ],
    },
    CB2025002: {
        fundsRaised: 125000,
        expenses: 98000,
        remainingBalance: 27000,
        transactions: [
            { id: '1', date: '2025-08-10', description: 'College Administration Grant', type: 'income', amount: 80000, category: 'College Fund' },
            { id: '2', date: '2025-08-20', description: 'Alumni Contributions', type: 'income', amount: 30000, category: 'Alumni' },
            { id: '3', date: '2025-08-25', description: 'Entry Tickets', type: 'income', amount: 15000, category: 'Tickets' },
            { id: '4', date: '2025-09-01', description: 'Venue Decoration', type: 'expense', amount: 18000, category: 'Decor' },
            { id: '5', date: '2025-09-10', description: 'Cultural Programs', type: 'expense', amount: 35000, category: 'Programs' },
            { id: '6', date: '2025-09-15', description: 'Prizes & Awards', type: 'expense', amount: 25000, category: 'Prizes' },
            { id: '7', date: '2025-09-18', description: 'Marketing & Publicity', type: 'expense', amount: 20000, category: 'Marketing' },
        ],
    },
    CB2025003: {
        fundsRaised: 45000,
        expenses: 38000,
        remainingBalance: 7000,
        transactions: [
            { id: '1', date: '2025-10-01', description: 'Department Budget', type: 'income', amount: 30000, category: 'Department Fund' },
            { id: '2', date: '2025-10-10', description: 'Student Contributions', type: 'income', amount: 15000, category: 'Student Fund' },
            { id: '3', date: '2025-10-15', description: 'Technical Equipment Rental', type: 'expense', amount: 12000, category: 'Equipment' },
            { id: '4', date: '2025-10-18', description: 'Guest Speaker Honorarium', type: 'expense', amount: 8000, category: 'Speakers' },
            { id: '5', date: '2025-10-20', description: 'Event Supplies', type: 'expense', amount: 10000, category: 'Supplies' },
            { id: '6', date: '2025-10-22', description: 'Refreshments', type: 'expense', amount: 8000, category: 'Catering' },
        ],
    },
    CB2025004: {
        fundsRaised: 180000,
        expenses: 145000,
        remainingBalance: 35000,
        transactions: [
            { id: '1', date: '2025-07-01', description: 'College Annual Fund', type: 'income', amount: 100000, category: 'College Budget' },
            { id: '2', date: '2025-07-15', description: 'Corporate Sponsors', type: 'income', amount: 50000, category: 'Sponsorship' },
            { id: '3', date: '2025-07-20', description: 'Student Fundraising', type: 'income', amount: 30000, category: 'Fundraising' },
            { id: '4', date: '2025-08-01', description: 'Main Stage Setup', type: 'expense', amount: 40000, category: 'Infrastructure' },
            { id: '5', date: '2025-08-10', description: 'Artist Performances', type: 'expense', amount: 50000, category: 'Entertainment' },
            { id: '6', date: '2025-08-15', description: 'Security & Management', type: 'expense', amount: 20000, category: 'Security' },
            { id: '7', date: '2025-08-18', description: 'Food Stalls & Catering', type: 'expense', amount: 25000, category: 'Catering' },
            { id: '8', date: '2025-08-20', description: 'Miscellaneous', type: 'expense', amount: 10000, category: 'Others' },
        ],
    },
    CB2025005: {
        fundsRaised: 35000,
        expenses: 28000,
        remainingBalance: 7000,
        transactions: [
            { id: '1', date: '2025-11-01', description: 'Department Allocation', type: 'income', amount: 20000, category: 'Department' },
            { id: '2', date: '2025-11-05', description: 'Student Participation Fee', type: 'income', amount: 15000, category: 'Registration' },
            { id: '3', date: '2025-11-10', description: 'Venue Booking', type: 'expense', amount: 8000, category: 'Venue' },
            { id: '4', date: '2025-11-12', description: 'Equipment & Materials', type: 'expense', amount: 12000, category: 'Equipment' },
            { id: '5', date: '2025-11-15', description: 'Refreshments', type: 'expense', amount: 5000, category: 'Catering' },
            { id: '6', date: '2025-11-18', description: 'Certificates & Prizes', type: 'expense', amount: 3000, category: 'Awards' },
        ],
    },
};

// State
let currentView = 'landing';
let events = [];
let selectedEventId = null;
let fundDataCache = {};
let currentTransactionFilter = 'all';
let currentEventTransactions = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Setup event listeners
    setupEventListeners();

    // Show landing page
    showPage('landing');
}

function setupEventListeners() {
    // Navigation
    document.getElementById('nav-logo').addEventListener('click', () => navigateTo('landing'));
    document.getElementById('nav-home').addEventListener('click', () => navigateTo('landing'));
    document.getElementById('nav-events').addEventListener('click', () => navigateTo('events'));

    // Landing page
    document.getElementById('view-events-btn').addEventListener('click', () => navigateTo('events'));

    // Details page
    document.getElementById('back-btn').addEventListener('click', () => navigateTo('events'));

    // Transaction filter buttons
    setupTransactionFilters();

    // Stat card click handlers
    document.getElementById('funds-raised-card').addEventListener('click', () => filterTransactions('income'));
    document.getElementById('expenses-card').addEventListener('click', () => filterTransactions('expense'));
}

function setupTransactionFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            filterTransactions(filter);
        });
    });
}

function filterTransactions(filter) {
    currentTransactionFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    
    // Filter and render transactions
    renderFilteredTransactions();
    
    // Scroll to transactions section
    document.querySelector('.transactions-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderFilteredTransactions() {
    const transactionsBody = document.getElementById('transactions-body');
    const noTransactions = document.getElementById('no-transactions');
    const tableWrapper = document.getElementById('transactions-table-wrapper');
    const titleElement = document.getElementById('transactions-main-title');
    
    // Filter transactions based on current filter
    let filteredTransactions = currentEventTransactions;
    if (currentTransactionFilter === 'income') {
        filteredTransactions = currentEventTransactions.filter(t => t.type === 'income');
        titleElement.textContent = 'Funds Raised - Detailed Transactions';
    } else if (currentTransactionFilter === 'expense') {
        filteredTransactions = currentEventTransactions.filter(t => t.type === 'expense');
        titleElement.textContent = 'Expenses - Detailed Transactions';
    } else {
        titleElement.textContent = 'Transaction Summary';
    }
    
    if (filteredTransactions.length === 0) {
        noTransactions.style.display = 'block';
        tableWrapper.style.display = 'none';
        if (currentTransactionFilter === 'income') {
            noTransactions.querySelector('p').textContent = 'No funds raised transactions recorded yet.';
        } else if (currentTransactionFilter === 'expense') {
            noTransactions.querySelector('p').textContent = 'No expense transactions recorded yet.';
        } else {
            noTransactions.querySelector('p').textContent = 'No transactions recorded yet.';
        }
    } else {
        noTransactions.style.display = 'none';
        tableWrapper.style.display = 'block';
        transactionsBody.innerHTML = filteredTransactions.map(transaction => `
            <tr>
                <td class="transaction-date">${formatDateLong(transaction.date)}</td>
                <td class="transaction-description">${transaction.description}</td>
                <td>
                    <span class="transaction-category">${transaction.category}</span>
                </td>
                <td class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
                </td>
            </tr>
        `).join('');
    }
}

function navigateTo(view) {
    currentView = view;
    showPage(view);
    updateNavbar();

    if (view === 'events') {
        loadEvents();
    }
}

function showPage(view) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(`${view}-page`).classList.add('active');
}

function updateNavbar() {
    const homeBtn = document.getElementById('nav-home');
    const eventsBtn = document.getElementById('nav-events');

    homeBtn.classList.toggle('active', currentView === 'landing');
    eventsBtn.classList.toggle('active', currentView === 'events' || currentView === 'details');
}

// Load Events (Pure Local Data)
async function loadEvents() {
    try {
        showLoading(true);

        // Use local mock data
        events = getMockEvents();

        // Load fund data for each event
        fundDataCache = {};
        for (const event of events) {
            const funds = getFundData(event.cashbook_id);
            fundDataCache[event.id] = funds.fundsRaised;
        }

        renderEventsBySection();
    } catch (error) {
        console.error('Error loading events:', error);
        events = [];
        renderEventsBySection();
    } finally {
        showLoading(false);
    }
}

function getMockEvents() {
    return [
        {
            id: '1',
            title: 'Union Day 2025',
            description: 'Annual student union celebration with cultural programs, competitions, and entertainment. A day-long event celebrating student unity and college spirit.',
            type: 'College Event',
            status: 'Upcoming',
            date: '2025-10-20',
            team: 'Student Union',
            cashbook_id: 'CB2025001',
            media: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
            created_at: '2025-09-01',
            updated_at: '2025-10-01'
        },
        {
            id: '2',
            title: 'College Day 2025',
            description: 'Grand annual college day celebration featuring cultural performances, award ceremonies, and alumni meet. The biggest event of the academic year.',
            type: 'College Event',
            status: 'Upcoming',
            date: '2025-09-15',
            team: 'College Administration',
            cashbook_id: 'CB2025002',
            media: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
            created_at: '2025-08-01',
            updated_at: '2025-09-01'
        },
        {
            id: '3',
            title: 'CS Department Fest - CodeFiesta',
            description: 'Department technical fest with coding competitions, hackathons, tech talks, and project exhibitions. Open to all students.',
            type: 'Department Fest',
            status: 'Ongoing',
            date: '2025-10-25',
            team: 'Computer Science Department',
            cashbook_id: 'CB2025003',
            media: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
            created_at: '2025-10-01',
            updated_at: '2025-10-15'
        },
        {
            id: '7',
            title: 'Mechanical Fest - MechMania',
            description: 'Annual technical fest of Mechanical Engineering department featuring robotics competitions, project exhibitions, and technical paper presentations.',
            type: 'Department Fest',
            status: 'Upcoming',
            date: '2025-11-10',
            team: 'Mechanical Department',
            cashbook_id: 'CB2025001',
            media: 'https://images.unsplash.com/photo-1581093450021-efdabf4ffdd9?w=800',
            created_at: '2025-10-10',
            updated_at: '2025-10-20'
        },
        {
            id: '8',
            title: 'Electronics Expo - ElectroVerve',
            description: 'Showcasing innovative electronics projects, circuit design competitions, and workshops on emerging technologies in electronics.',
            type: 'Department Fest',
            status: 'Upcoming',
            date: '2025-11-15',
            team: 'Electronics Department',
            cashbook_id: 'CB2025002',
            media: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
            created_at: '2025-10-05',
            updated_at: '2025-10-25'
        },
        {
            id: '4',
            title: 'Annual College Fest - Euphoria 2025',
            description: 'Three-day mega college fest with celebrity performances, competitions, food stalls, and entertainment. The most awaited event of the year.',
            type: 'College Fest',
            status: 'Upcoming',
            date: '2025-08-10',
            team: 'Fest Organizing Committee',
            cashbook_id: 'CB2025004',
            media: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
            created_at: '2025-07-01',
            updated_at: '2025-07-20'
        },
        {
            id: '5',
            title: 'Industrial Visit - Tech Park Bangalore',
            description: 'Educational industrial visit to major tech companies in Bangalore. Includes company tours, interaction with professionals, and networking opportunities.',
            type: 'IV Plan',
            status: 'Completed',
            date: '2025-09-10',
            team: 'CS & IT Departments',
            cashbook_id: 'CB2025005',
            media: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
            created_at: '2025-08-25',
            updated_at: '2025-09-15'
        },
        {
            id: '9',
            title: 'IV - Automobile Manufacturing Plant',
            description: 'Industrial visit to leading automobile manufacturing plant to understand modern production techniques and industry practices.',
            type: 'IV Plan',
            status: 'Upcoming',
            date: '2025-11-20',
            team: 'Mechanical & Automobile',
            cashbook_id: 'CB2025003',
            media: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?w=800',
            created_at: '2025-10-15',
            updated_at: '2025-10-30'
        },
        {
            id: '10',
            title: 'IV - Software Development Center',
            description: 'Visit to a leading software development center to understand agile methodologies and software development life cycle.',
            type: 'IV Plan',
            status: 'Upcoming',
            date: '2025-12-05',
            team: 'Computer Science Department',
            cashbook_id: 'CB2025004',
            media: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
            created_at: '2025-10-20',
            updated_at: '2025-11-05'
        },
        {
            id: '11',
            title: 'Civil Engineering Site Visit',
            description: 'Field visit to major construction site to observe modern construction techniques and project management practices.',
            type: 'IV Plan',
            status: 'Upcoming',
            date: '2025-11-25',
            team: 'Civil Engineering Department',
            cashbook_id: 'CB2025005',
            media: 'https://images.unsplash.com/photo-1581093450021-efdabf4ffdd9?w=800',
            created_at: '2025-10-10',
            updated_at: '2025-11-10'
        },
        {
            id: '6',
            title: 'Sports Day 2024',
            description: 'Annual inter-department sports competition with various indoor and outdoor games. Promoting fitness and team spirit among students.',
            type: 'College Event',
            status: 'Completed',
            date: '2025-08-20',
            team: 'Sports Committee',
            cashbook_id: 'CB2025001',
            media: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
            created_at: '2025-07-15',
            updated_at: '2025-08-25'
        },
        {
            id: '12',
            title: 'Cultural Fest - Rhythm 2025',
            description: 'Annual cultural extravaganza featuring dance, music, drama, and fine arts competitions from across the country.',
            type: 'College Fest',
            status: 'Upcoming',
            date: '2025-12-15',
            team: 'Cultural Committee',
            cashbook_id: 'CB2025002',
            media: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
            created_at: '2025-11-01',
            updated_at: '2025-11-20'
        },
        {
            id: '13',
            title: 'Tech Symposium 2025',
            description: 'National level technical symposium with paper presentations, technical quizzes, and guest lectures from industry experts.',
            type: 'College Event',
            status: 'Upcoming',
            date: '2025-12-01',
            team: 'Technical Committee',
            cashbook_id: 'CB2025003',
            media: 'https://images.unsplash.com/photo-1454165804606-c3b57d1a8f5d?w=800',
            created_at: '2025-11-05',
            updated_at: '2025-11-25'
        }
    ];
}

// Get fund data from local storage
function getFundData(cashbookId) {
    return FUND_DATA[cashbookId] || {
        fundsRaised: 0,
        expenses: 0,
        remainingBalance: 0,
        transactions: []
    };
}

function renderEventsBySection() {
    // Separate events into Upcoming and Completed
    const upcomingEvents = events.filter(e => e.status === 'Upcoming' || e.status === 'Ongoing');
    const completedEvents = events.filter(e => e.status === 'Completed' || e.status === 'Cancelled');

    // Render Upcoming Events
    renderEventsInGrid('upcoming-events-grid', 'no-upcoming-events', upcomingEvents);
    
    // Render Completed Events
    renderEventsInGrid('completed-events-grid', 'no-completed-events', completedEvents);

    // Update counts
    document.getElementById('upcoming-count').textContent = upcomingEvents.length;
    document.getElementById('completed-count').textContent = completedEvents.length;

    // Show/hide sections
    document.getElementById('upcoming-section').style.display = upcomingEvents.length > 0 ? 'block' : 'none';
    document.getElementById('completed-section').style.display = completedEvents.length > 0 ? 'block' : 'none';

    // Show no events message if both are empty
    const noEvents = document.getElementById('no-events');
    if (upcomingEvents.length === 0 && completedEvents.length === 0) {
        noEvents.style.display = 'block';
    } else {
        noEvents.style.display = 'none';
    }
}

function renderEventsInGrid(gridId, noResultsId, eventsList) {
    const grid = document.getElementById(gridId);
    const noResults = document.getElementById(noResultsId);

    if (eventsList.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    grid.innerHTML = eventsList.map(event => `
        <div class="event-card" onclick="viewEventDetails('${event.id}')">
            <div class="event-content">
                <div class="event-header">
                    <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-badges">
                    <span class="badge-type ${event.type.toLowerCase().replace(' ', '-')}">${event.type}</span>
                    <span class="badge-status ${event.status.toLowerCase()}">${event.status}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-footer">
                    <div class="event-date">
                        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${formatDate(event.date)}
                    </div>
                    <div class="event-amount">${formatCurrency(fundDataCache[event.id] || 0)}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function viewEventDetails(eventId) {
    selectedEventId = eventId;
    const event = events.find(e => e.id === eventId);

    if (!event) return;

    const fundData = getFundData(event.cashbook_id);

    // Update event media
    const mediaEl = document.getElementById('event-media');
    if (event.media) {
        mediaEl.innerHTML = `<img src="${event.media}" alt="${event.title}">`;
        mediaEl.style.display = 'block';
    } else {
        mediaEl.style.display = 'none';
    }

    // Update details
    document.getElementById('details-title').textContent = event.title;
    document.getElementById('details-description').textContent = event.description;
    document.getElementById('details-status').textContent = event.status;
    document.getElementById('details-status').className = `status-badge badge-status ${event.status.toLowerCase()}`;
    document.getElementById('details-date').textContent = formatDateLong(event.date);

    // Update team info
    const teamWrapper = document.getElementById('details-team-wrapper');
    if (event.team) {
        document.getElementById('details-team').textContent = event.team;
        teamWrapper.style.display = 'flex';
    } else {
        teamWrapper.style.display = 'none';
    }

    // Update stats
    document.getElementById('stat-raised').textContent = formatCurrency(fundData.fundsRaised);
    document.getElementById('stat-expenses').textContent = formatCurrency(fundData.expenses);
    document.getElementById('stat-balance').textContent = formatCurrency(fundData.remainingBalance);

    // Store current event transactions and reset filter
    currentEventTransactions = fundData.transactions;
    currentTransactionFilter = 'all';
    
    // Reset filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('active');
        }
    });
    
    // Render all transactions initially
    renderFilteredTransactions();

    navigateTo('details');
}

function showLoading(show) {
    document.getElementById('loading-spinner').style.display = show ? 'flex' : 'none';
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateLong(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}
