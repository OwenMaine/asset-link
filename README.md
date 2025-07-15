AssetLink
AssetLink is a simple, mobile-first web application that allows teams to track physical assets using QR codes. Built for speed and simplicity, it helps small businesses and teams eliminate messy spreadsheets and gain real-time visibility into who has what.

This project was prototyped for a hackathon.

Demo


The Problem
Many small to medium-sized businesses track valuable shared assets—like laptops, projectors, tools, and AV equipment—using unreliable spreadsheets or paper-based logs. This method is inefficient, prone to human error, and provides no real-time accountability, often leading to lost equipment and wasted time.

The Solution
AssetLink provides a streamlined solution by leveraging the one tool every employee has: a smartphone.

Tag It: An administrator adds an asset to the system, which generates a unique QR code.

Scan It: Any team member can scan the QR code using their phone's web browser to instantly view the asset's status.

Track It: The system allows users to "Check Out" or "Check In" an asset, creating a clear, time-stamped digital trail.

The result is a frictionless system that provides instant clarity and accountability, accessible to anyone on the team without needing to install a native application.

Features
QR Code Scanning: Uses the device's camera directly in the browser to scan assets.

Real-Time Database: All data is stored and retrieved instantly from a central Supabase database.

Check In / Check Out: Simple, two-button actions to update an asset's status.

Asset Details View: A clean, responsive card displays all relevant information for a scanned asset.

Mobile-First Design: The UI is optimized for a seamless experience on any smartphone.

Tech Stack
This project was built with a focus on rapid development and scalability, using modern and accessible technologies.

Technology

Purpose

HTML5

Core structure of the application.

CSS3

Custom styling for a clean, modern UI.

JavaScript (ES6+)

Application logic, DOM manipulation, and API calls.

html5-qrcode

A powerful library for easy implementation of camera-based QR code scanning.

Supabase

The all-in-one backend solution, providing a PostgreSQL database, authentication, and instant APIs.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites

You don't need any complex build tools, just a modern web browser and a code editor. A local development server is highly recommended to avoid potential browser security issues with camera access. The Live Server extension for VS Code is a great option.

Installation

Clone the repository:

git clone https://github.com/OwenMaine/assetlink.git
cd assetlink

Set up the Supabase Backend:

Create a free account at supabase.com.

Create a new project.

In the SQL Editor, run the following query to create the assets table:

CREATE TABLE assets (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  asset_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  checked_out_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

Go to the Table Editor and insert a few sample assets. Ensure the asset_id values match the QR codes you will use for testing (e.g., ASSET-001).

Configure API Credentials:

In your Supabase project, navigate to Project Settings > API.

Copy your Project URL and your anon public API Key.

Open the app.js file and replace the placeholder values:

// app.js
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Paste your URL here
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Paste your key here

Usage

Start a local development server (e.g., using VS Code's "Live Server").

Open the application in your web browser.

Grant camera permissions when prompted.

Scan a QR code that corresponds to an asset_id in your database.

View the asset's details and use the "Check In" or "Check Out" buttons.

Future Improvements
Admin Dashboard: A separate, protected view for administrators to add, edit, and delete assets without using the SQL editor.

User Authentication: Require users to log in to check items in/out, automatically capturing their name instead of using a prompt.

History Log: Track a complete history of every check-in/out action for each asset.

Search Functionality: Allow users to search for assets by name or ID.

