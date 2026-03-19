# GigShield

GigShield is a parametric insurance prototype designed for gig workers such as Swiggy and Zomato delivery partners. It provides automatic income protection by detecting real-world disruptions like rain and extreme weather, and triggering payouts without requiring manual claims.

---

## Problem Statement

Delivery partners depend on daily earnings. External conditions such as heavy rain, extreme heat, or environmental disruptions can significantly reduce their ability to work. Traditional insurance models are slow, require manual claims, and are not suitable for gig workers.

---

## Solution

GigShield introduces a parametric insurance model where payouts are triggered automatically based on real-time environmental data.

Instead of filing claims, the system:
1. Monitors weather conditions using APIs
2. Calculates risk levels
3. Estimates income loss
4. Automatically triggers payouts when thresholds are met

---

## Key Features

- Worker onboarding with profile details
- Real-time weather data integration
- Risk classification (Low, Medium, High)
- Automated payout calculation
- Weekly subscription model (₹29/week)
- Coverage limit of ₹1000 per week
- No manual claim process
- Basic fraud prevention through data-based triggers

---

## How It Works

1. User Onboarding  
   The worker enters details such as name, city, platform (Swiggy/Zomato), average earnings per hour, and working hours.

2. Identity Assignment  
   Each worker is assigned a unique ID and marked as verified (simulated for prototype).

3. Data Collection  
   The system fetches real-time weather data using OpenWeather API.

4. Risk Calculation  
   Risk is calculated based on:
   - Temperature
   - Rainfall intensity

5. Income Loss Estimation  
   Based on risk level:
   - Low: No loss
   - Medium: Partial loss (2 hours)
   - High: Major loss (5 hours)

6. Payout Calculation  
   Payout = hourly earnings × hours lost  
   Final payout is capped at ₹1000 per week.

7. Automatic Trigger  
   If conditions meet predefined thresholds, payout is triggered automatically.

---

## Technology Stack

- Frontend: React (Vite)
- Styling: Tailwind CSS
- Animation: Framer Motion
- API: OpenWeather API
- Storage: LocalStorage (for prototype)

---

## Security and Fraud Prevention

- Each worker is assigned a unique ID
- Worker verification is simulated during onboarding
- Payouts are triggered only by external weather data
- No manual claim submission is allowed
- Coverage cap prevents excessive payouts
- System design reduces scope for fraudulent claims

---

## Project Structure

- Landing Page: Introduction and entry point
- Onboarding Page: Worker data collection
- Dashboard:
  - Weather display
  - Risk analysis
  - Insurance details
  - Payout calculation
  - Disruption detection

---

