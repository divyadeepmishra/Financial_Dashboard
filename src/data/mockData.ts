import { Transaction } from '@/types';

export const transactions: Transaction[] = [
  // October 2025
  { id: 'txn-001', date: '2025-10-02', amount: 75000, category: 'Salary', type: 'income', description: 'Monthly salary credit', merchant: 'TechVista Solutions' },
  { id: 'txn-002', date: '2025-10-03', amount: -450, category: 'Food', type: 'expense', description: 'Dinner order', merchant: 'Swiggy' },
  { id: 'txn-003', date: '2025-10-05', amount: -1200, category: 'Transport', type: 'expense', description: 'Weekly commute', merchant: 'Ola' },
  { id: 'txn-004', date: '2025-10-08', amount: -3499, category: 'Shopping', type: 'expense', description: 'Wireless headphones', merchant: 'Amazon' },
  { id: 'txn-005', date: '2025-10-10', amount: -890, category: 'Utilities', type: 'expense', description: 'Electricity bill', merchant: 'Tata Power' },
  { id: 'txn-006', date: '2025-10-12', amount: 15000, category: 'Freelance', type: 'income', description: 'UI design project payment', merchant: 'DesignCraft Studio' },
  { id: 'txn-007', date: '2025-10-15', amount: -15000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Housing Society' },
  { id: 'txn-008', date: '2025-10-18', amount: -650, category: 'Entertainment', type: 'expense', description: 'Movie tickets + popcorn', merchant: 'PVR Cinemas' },
  { id: 'txn-009', date: '2025-10-22', amount: -1500, category: 'Healthcare', type: 'expense', description: 'Doctor consultation', merchant: 'Apollo Clinic' },
  { id: 'txn-010', date: '2025-10-25', amount: -5000, category: 'Investment', type: 'expense', description: 'SIP mutual fund', merchant: 'Zerodha' },

  // November 2025
  { id: 'txn-011', date: '2025-11-01', amount: 75000, category: 'Salary', type: 'income', description: 'Monthly salary credit', merchant: 'TechVista Solutions' },
  { id: 'txn-012', date: '2025-11-03', amount: -780, category: 'Food', type: 'expense', description: 'Grocery shopping', merchant: 'BigBasket' },
  { id: 'txn-013', date: '2025-11-05', amount: -350, category: 'Food', type: 'expense', description: 'Lunch order', merchant: 'Zomato' },
  { id: 'txn-014', date: '2025-11-07', amount: -2100, category: 'Shopping', type: 'expense', description: 'Winter jacket', merchant: 'Myntra' },
  { id: 'txn-015', date: '2025-11-10', amount: -499, category: 'Utilities', type: 'expense', description: 'Internet bill', merchant: 'Jio Fiber' },
  { id: 'txn-016', date: '2025-11-12', amount: -1800, category: 'Transport', type: 'expense', description: 'Uber rides this week', merchant: 'Uber' },
  { id: 'txn-017', date: '2025-11-15', amount: -15000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Housing Society' },
  { id: 'txn-018', date: '2025-11-18', amount: 8000, category: 'Freelance', type: 'income', description: 'Logo design project', merchant: 'BrandForge' },
  { id: 'txn-019', date: '2025-11-22', amount: -999, category: 'Entertainment', type: 'expense', description: 'Netflix annual plan proration', merchant: 'Netflix' },
  { id: 'txn-020', date: '2025-11-25', amount: -5000, category: 'Investment', type: 'expense', description: 'SIP mutual fund', merchant: 'Zerodha' },

  // December 2025
  { id: 'txn-021', date: '2025-12-01', amount: 75000, category: 'Salary', type: 'income', description: 'Monthly salary credit', merchant: 'TechVista Solutions' },
  { id: 'txn-022', date: '2025-12-03', amount: -1250, category: 'Food', type: 'expense', description: 'Party dinner', merchant: 'Barbeque Nation' },
  { id: 'txn-023', date: '2025-12-06', amount: -8999, category: 'Shopping', type: 'expense', description: 'Christmas gifts', merchant: 'Flipkart' },
  { id: 'txn-024', date: '2025-12-08', amount: 12000, category: 'Freelance', type: 'income', description: 'Web development project', merchant: 'CodeCraft Labs' },
  { id: 'txn-025', date: '2025-12-10', amount: -750, category: 'Utilities', type: 'expense', description: 'Gas bill', merchant: 'Indraprastha Gas' },
  { id: 'txn-026', date: '2025-12-12', amount: -2400, category: 'Healthcare', type: 'expense', description: 'Dental checkup', merchant: 'Clove Dental' },
  { id: 'txn-027', date: '2025-12-15', amount: -15000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Housing Society' },
  { id: 'txn-028', date: '2025-12-18', amount: -1600, category: 'Transport', type: 'expense', description: 'Train tickets home', merchant: 'IRCTC' },
  { id: 'txn-029', date: '2025-12-22', amount: -3200, category: 'Entertainment', type: 'expense', description: 'Concert tickets', merchant: 'BookMyShow' },
  { id: 'txn-030', date: '2025-12-28', amount: -5000, category: 'Investment', type: 'expense', description: 'SIP mutual fund', merchant: 'Zerodha' },

  // January 2026
  { id: 'txn-031', date: '2026-01-02', amount: 78000, category: 'Salary', type: 'income', description: 'Monthly salary with increment', merchant: 'TechVista Solutions' },
  { id: 'txn-032', date: '2026-01-04', amount: -560, category: 'Food', type: 'expense', description: 'Coffee subscription', merchant: 'Blue Tokai' },
  { id: 'txn-033', date: '2026-01-06', amount: -4500, category: 'Shopping', type: 'expense', description: 'Running shoes', merchant: 'Nike' },
  { id: 'txn-034', date: '2026-01-09', amount: -920, category: 'Utilities', type: 'expense', description: 'Water & electricity', merchant: 'BSES Yamuna' },
  { id: 'txn-035', date: '2026-01-12', amount: -1400, category: 'Transport', type: 'expense', description: 'Rapido rides', merchant: 'Rapido' },
  { id: 'txn-036', date: '2026-01-15', amount: -15000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Housing Society' },
  { id: 'txn-037', date: '2026-01-18', amount: 20000, category: 'Freelance', type: 'income', description: 'App prototype delivery', merchant: 'StartupX' },
  { id: 'txn-038', date: '2026-01-20', amount: -850, category: 'Entertainment', type: 'expense', description: 'Spotify + YouTube premium', merchant: 'Spotify' },
  { id: 'txn-039', date: '2026-01-24', amount: -3200, category: 'Healthcare', type: 'expense', description: 'Annual health checkup', merchant: 'Max Healthcare' },
  { id: 'txn-040', date: '2026-01-28', amount: -10000, category: 'Investment', type: 'expense', description: 'SIP + gold ETF', merchant: 'Groww' },

  // February 2026
  { id: 'txn-041', date: '2026-02-01', amount: 78000, category: 'Salary', type: 'income', description: 'Monthly salary credit', merchant: 'TechVista Solutions' },
  { id: 'txn-042', date: '2026-02-04', amount: -680, category: 'Food', type: 'expense', description: 'Weekly groceries', merchant: 'DMart' },
  { id: 'txn-043', date: '2026-02-06', amount: -1999, category: 'Shopping', type: 'expense', description: 'Backpack', merchant: 'Wildcraft' },
  { id: 'txn-044', date: '2026-02-09', amount: -950, category: 'Transport', type: 'expense', description: 'Metro card recharge', merchant: 'Delhi Metro' },
  { id: 'txn-045', date: '2026-02-12', amount: -499, category: 'Utilities', type: 'expense', description: 'Mobile recharge', merchant: 'Airtel' },
  { id: 'txn-046', date: '2026-02-14', amount: -4500, category: 'Food', type: 'expense', description: 'Valentine dinner', merchant: 'The Table' },
  { id: 'txn-047', date: '2026-02-15', amount: -15000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Housing Society' },
  { id: 'txn-048', date: '2026-02-18', amount: 5000, category: 'Investment', type: 'income', description: 'Dividend payout', merchant: 'HDFC Mutual Fund' },
  { id: 'txn-049', date: '2026-02-22', amount: -1200, category: 'Entertainment', type: 'expense', description: 'Gaming subscription', merchant: 'Steam' },
  { id: 'txn-050', date: '2026-02-26', amount: -5000, category: 'Investment', type: 'expense', description: 'SIP mutual fund', merchant: 'Zerodha' },

  // March 2026
  { id: 'txn-051', date: '2026-03-01', amount: 78000, category: 'Salary', type: 'income', description: 'Monthly salary credit', merchant: 'TechVista Solutions' },
  { id: 'txn-052', date: '2026-03-03', amount: -890, category: 'Food', type: 'expense', description: 'Dinner with friends', merchant: 'Haldiram' },
  { id: 'txn-053', date: '2026-03-05', amount: -6500, category: 'Shopping', type: 'expense', description: 'Smart watch', merchant: 'Croma' },
  { id: 'txn-054', date: '2026-03-08', amount: 25000, category: 'Freelance', type: 'income', description: 'Dashboard design project', merchant: 'FinEdge Analytics' },
  { id: 'txn-055', date: '2026-03-10', amount: -1100, category: 'Utilities', type: 'expense', description: 'Electricity + internet', merchant: 'Tata Power' },
  { id: 'txn-056', date: '2026-03-12', amount: -2200, category: 'Transport', type: 'expense', description: 'Flight tickets', merchant: 'IndiGo' },
  { id: 'txn-057', date: '2026-03-15', amount: -15000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Housing Society' },
  { id: 'txn-058', date: '2026-03-18', amount: -1800, category: 'Healthcare', type: 'expense', description: 'Pharmacy order', merchant: 'PharmEasy' },
  { id: 'txn-059', date: '2026-03-22', amount: -2500, category: 'Entertainment', type: 'expense', description: 'Weekend getaway activity', merchant: 'MakeMyTrip' },
  { id: 'txn-060', date: '2026-03-28', amount: -10000, category: 'Investment', type: 'expense', description: 'SIP + stock purchase', merchant: 'Zerodha' },
];
