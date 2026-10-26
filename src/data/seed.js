// Seed data copied verbatim from the original index.html (same storage keys, same rides, same reviews).
export const STORAGE_KEYS = { RIDES: 'CC_EVAL1_RIDES', BOOKINGS: 'CC_EVAL1_BOOKINGS', CURRENT_USER: 'CC_EVAL1_CURRENT_USER' };
export const USERS_KEY = 'CC_EVAL2_USERS';
export const REVIEWS_KEY = 'CC_EVAL2_REVIEWS';
export const THEME_KEY = 'CC_EVAL1_THEME';
export const DEPARTMENTS = ['Computer Science', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Business & Management', 'Design', 'Law', 'Pharmacy', 'Other'];
export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const RIDE_DATE = (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })();
const R = (id, driver, origin, dest, time, vehicle, model, price, seats, rating, amen, phone) => ({ id, driver, origin, dest, time, date: RIDE_DATE, vehicle, model, price, seats, rating, amen, phone });
export const INITIAL_RIDES = [
  R('cp-01', 'Simran Kaur', 'Mohali Phase 7', 'Chitkara Turing Block (NH-64)', '08:15 AM', 'Car', 'Tata Nexon EV', 60, 2, 5.0, ['AC On', 'Ladies Only', 'Quiet Companion GPS', 'Non-Smoking'], '+91 98140 88221'),
  R('cp-02', 'Amanpreet Singh', 'Chandigarh Sector 43 ISBT', 'Chitkara Main Gate Rajpura', '08:00 AM', 'Car', 'Hyundai i20', 70, 3, 4.9, ['AC On', 'Music Allowed', 'Backpack Space', 'Quiet Companion GPS'], '+91 98722 33445'),
  R('cp-03', 'Aarav Patel', 'Panchkula Sector 5', 'Chitkara Picasso Block', '08:10 AM', 'Car', 'Maruti Baleno', 65, 1, 4.8, ['AC On', 'Backpack Space'], '+91 94170 55667'),
  R('cp-04', 'Harpreet Singh', 'Patiala Bus Stand', 'Chitkara Le Corbusier', '08:25 AM', 'Bike', 'Royal Enfield', 50, 1, 4.7, ['Helmet Provided', 'Music Allowed'], '+91 99881 22334'),
  R('cp-05', 'Gurpreet Singh', 'Ambala Cantt', 'Chitkara Rajpura Campus (NH-64)', '07:50 AM', 'Car', 'Maruti Swift', 65, 2, 4.6, ['AC On', 'Non-Smoking'], '+91 98765 22110'),
  R('cp-06', 'Nisha Verma', 'Mohali Phase 3B2', 'Chitkara Picasso Block', '08:20 AM', 'Car', 'Maruti Dzire', 55, 3, 4.8, ['AC On', 'Music Allowed', 'Quiet Companion GPS'], '+91 98880 62718'),
  R('cp-07', 'Jasleen Kaur', 'Mohali Sohana Gurdwara', 'Chitkara Turing Block (NH-64)', '08:05 AM', 'Car', 'Honda Amaze', 50, 2, 4.7, ['AC On', 'Ladies Only', 'Non-Smoking'], '+91 98725 40916'),
  R('cp-08', 'Mehak Arora', 'Chandigarh Sector 35', 'Chitkara Turing Block (NH-64)', '07:55 AM', 'Car', 'Kia Seltos', 75, 2, 4.9, ['AC On', 'Ladies Only', 'Backpack Space'], '+91 98551 70233'),
  R('cp-09', 'Divya Mehta', 'Chandigarh Tribune Chowk', 'Chitkara Main Gate Rajpura', '07:40 AM', 'Car', 'Mahindra XUV700', 72, 4, 4.9, ['AC On', 'Backpack Space', 'Non-Smoking'], '+91 98159 43370'),
  R('cp-10', 'Rohit Sharma', 'Panchkula Sector 20', 'Chitkara Main Gate Rajpura', '07:55 AM', 'Car', 'Honda City', 60, 2, 4.7, ['AC On', 'Non-Smoking'], '+91 98728 90514'),
  R('cp-11', 'Armaan Khanna', 'Panchkula Mansa Devi', 'Chitkara Le Corbusier', '08:30 AM', 'Bike', 'TVS Apache', 55, 1, 4.6, ['Helmet Provided', 'Music Allowed'], '+91 99150 28841'),
  R('cp-12', 'Manvir Dhillon', 'Patiala Bahadurgarh', 'Chitkara Le Corbusier', '08:30 AM', 'Car', 'Toyota Innova', 45, 4, 4.6, ['AC On', 'Music Allowed', 'Backpack Space'], '+91 98780 21349'),
  R('cp-13', 'Ritika Sood', 'Patiala Leela Bhawan', 'Chitkara Picasso Block', '08:10 AM', 'Car', 'Maruti Ertiga', 50, 3, 4.8, ['AC On', 'Ladies Only', 'Quiet Companion GPS'], '+91 98142 63057'),
  R('cp-14', 'Tarandeep Kaur', 'Ambala City', 'Chitkara Rajpura Campus (NH-64)', '07:30 AM', 'Car', 'Honda City', 70, 3, 4.9, ['AC On', 'Ladies Only', 'Backpack Space'], '+91 98129 55087'),
  R('cp-15', 'Vikram Rana', 'Ambala Shahabad', 'Chitkara Turing Block (NH-64)', '07:45 AM', 'Bike', 'Bajaj Pulsar', 60, 1, 4.5, ['Helmet Provided', 'Quiet Companion GPS'], '+91 98963 10472'),
  R('cp-16', 'Karanveer Gill', 'Zirakpur VIP Road', 'Chitkara Rajpura Campus (NH-64)', '07:45 AM', 'Car', 'Hyundai Creta', 55, 3, 4.8, ['AC On', 'Music Allowed', 'Backpack Space'], '+91 98150 44120'),
  R('cp-17', 'Sahil Bansal', 'Zirakpur Peer Muchalla', 'Chitkara Rajpura Campus (NH-64)', '08:10 AM', 'Bike', 'Yamaha R15', 50, 1, 4.5, ['Helmet Provided', 'Quiet Companion GPS'], '+91 98143 76602'),
  R('cp-18', 'Ishaan Malhotra', 'Zirakpur Baltana', 'Chitkara Picasso Block', '08:15 AM', 'Car', 'Maruti Brezza', 45, 0, 4.7, ['AC On', 'Non-Smoking'], '+91 98780 55193'),
  R('cp-19', 'Jaspreet Sandhu', 'Rajpura Bus Stand', 'Chitkara Main Gate Rajpura', '08:40 AM', 'Bike', 'Hero Splendor', 40, 1, 4.7, ['Helmet Provided', 'Backpack Space'], '+91 97800 31456'),
  R('cp-20', 'Kirat Singh', 'Rajpura Bypass', 'Chitkara Turing Block (NH-64)', '08:35 AM', 'Car', 'Maruti Wagon R', 45, 2, 4.6, ['AC On', 'Music Allowed'], '+91 99140 18825'),
  R('cp-21', 'Palak Gupta', 'Rajpura Railway Station', 'Chitkara Le Corbusier', '08:25 AM', 'Car', 'Tata Tiago', 40, 0, 4.8, ['AC On', 'Ladies Only'], '+91 98884 72260'),
  R('cp-22', 'Harshdeep Brar', 'Mohali Phase 5', 'Chitkara Picasso Block', '07:35 AM', 'Car', 'Maruti Ciaz', 55, 3, 4.7, ['AC On', 'Music Allowed', 'Backpack Space'], '+91 98765 41203'),
  R('cp-23', 'Anjali Thakur', 'Mohali YPS Chowk', 'Chitkara Turing Block (NH-64)', '08:30 AM', 'Bike', 'Honda Hornet', 50, 1, 4.6, ['Helmet Provided', 'Quiet Companion GPS'], '+91 98154 62817'),
  R('cp-24', 'Pranav Chopra', 'Chandigarh Sector 17 Plaza', 'Chitkara Main Gate Rajpura', '08:20 AM', 'Car', 'Skoda Slavia', 68, 3, 4.8, ['AC On', 'Backpack Space', 'Quiet Companion GPS'], '+91 98723 90541'),
  R('cp-25', 'Mansi Bedi', 'Chandigarh Elante Mall', 'Chitkara Le Corbusier', '07:50 AM', 'Car', 'Hyundai Verna', 65, 2, 4.9, ['AC On', 'Ladies Only', 'Non-Smoking'], '+91 98557 31028'),
  R('cp-26', 'Lakshay Kapoor', 'Panchkula Sector 11', 'Chitkara Picasso Block', '08:15 AM', 'Car', 'Tata Altroz', 60, 3, 4.7, ['AC On', 'Music Allowed'], '+91 98881 47260'),
  R('cp-27', 'Sukhmani Grewal', 'Panchkula Sector 9 Market', 'Chitkara Rajpura Campus (NH-64)', '08:00 AM', 'Car', 'Kia Sonet', 58, 2, 4.8, ['AC On', 'Ladies Only', 'Backpack Space'], '+91 98141 20936'),
  R('cp-28', 'Naveen Chauhan', 'Patiala Fountain Chowk', 'Chitkara Main Gate Rajpura', '08:20 AM', 'Bike', 'Bajaj Dominar', 45, 1, 4.6, ['Helmet Provided', 'Backpack Space'], '+91 98726 58413'),
  R('cp-29', 'Aditi Saxena', 'Patiala Sheran Wala Gate', 'Chitkara Turing Block (NH-64)', '08:05 AM', 'Car', 'Hyundai Aura', 48, 3, 4.7, ['AC On', 'Ladies Only', 'Music Allowed'], '+91 98782 06375'),
  R('cp-30', 'Gagandeep Toor', 'Ambala Sadar Bazaar', 'Chitkara Le Corbusier', '07:35 AM', 'Car', 'Toyota Glanza', 62, 2, 4.6, ['AC On', 'Non-Smoking'], '+91 98962 74018'),
  R('cp-31', 'Ritvik Anand', 'Ambala Mullana Chowk', 'Chitkara Picasso Block', '07:55 AM', 'Bike', 'KTM Duke 200', 65, 1, 4.5, ['Helmet Provided', 'Quiet Companion GPS'], '+91 98133 85649'),
  R('cp-32', 'Sanya Walia', 'Zirakpur Dhakoli', 'Chitkara Turing Block (NH-64)', '08:25 AM', 'Car', 'Maruti Swift', 50, 3, 4.8, ['AC On', 'Ladies Only', 'Backpack Space'], '+91 98724 13597'),
  R('cp-33', 'Yuvraj Randhawa', 'Zirakpur Singhpura Chowk', 'Chitkara Main Gate Rajpura', '07:50 AM', 'Car', 'Tata Punch', 48, 0, 4.7, ['AC On', 'Music Allowed'], '+91 98559 60274'),
  R('cp-34', 'Kavya Sethi', 'Rajpura Gandhi Chowk', 'Chitkara Picasso Block', '08:45 AM', 'Car', 'Maruti Alto K10', 40, 2, 4.6, ['AC On', 'Ladies Only'], '+91 98883 52716'),
  R('cp-35', 'Dhruv Bajwa', 'Rajpura Anaj Mandi', 'Chitkara Rajpura Campus (NH-64)', '08:30 AM', 'Bike', 'Honda Shine', 40, 1, 4.5, ['Helmet Provided', 'Music Allowed'], '+91 98727 96430')
];
export const DATA_VERSION = '5';
export const DATA_VERSION_KEY = 'CC_DATA_VERSION';
export const INITIAL_REVIEWS = [
  { name: 'Rohan Gupta', meta: 'B.Tech CSE, 3rd Year • Commutes from Mohali', rating: 5, text: "Travelling from Mohali Phase 7 to Chitkara everyday was burning a ₹7,000 hole in my pocket every month. With CarpoolCampus, I split fuel with 3 classmates in my i20. Now my commute is almost free and I made great friends!" },
  { name: 'Anupriya Pandey', meta: 'Chitkara University, Punjab', rating: 5, text: "CarpoolCampus is a convenient and cost-effective platform for students to find and share rides. Easy to use, helpful for daily commuting, and has great potential with additional safety features." },
  { name: 'Simran Kaur', meta: 'B.Tech ECE, 2nd Year • Commutes from Chandigarh', rating: 4, text: "Booking a seat is quick and I love that the driver's phone number only unlocks after my seat is confirmed. Feels much safer than random lift-sharing groups." },
  { name: 'Priya Nair', meta: 'Mechanical Engg, 2nd Year • Commutes from Zirakpur', rating: 5, text: "I used to spend ₹120 on autos every day. Splitting rides with classmates cut that by more than half." },
  { name: 'Aman Kapoor', meta: 'CSE, 4th Year • Commutes from Mohali', rating: 5, text: "Offering my empty seats on the way to Mohali covers most of my fuel cost every week." },
  { name: 'Gurleen Bedi', meta: 'Design, 1st Year • Commutes from Panchkula', rating: 4, text: "As a first-year, finding a verified ride with students from my own campus gave me the confidence to commute on day one." }
];
