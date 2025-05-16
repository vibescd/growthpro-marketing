# GitHub Repository Setup Instructions

To create a repository and push this project to your GitHub account:

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `growthpro-marketing`
   - Description: "Business website with Stripe payment processing and a programmatic sales/marketing funnel"
   - Choose "Public" visibility
   - Click "Create repository"

2. From your Replit shell, run these commands:
```bash
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Set the remote repository
git remote add origin https://github.com/vibescd/growthpro-marketing.git

# Push to GitHub
git push -u origin main
```

Note: You might need to authenticate with your GitHub credentials when pushing.

If you encounter any issues, you can also use GitHub Desktop or download the project as a ZIP file from Replit and manually upload it to GitHub.
