# Game Developer Portfolio

A modern, responsive portfolio website designed for game developers and 3D specialists. Built with HTML, CSS, and JavaScript, optimized for GitHub Pages deployment.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Data-Driven Architecture**: Easy content management through JSON files
- **Project Showcase**: Dedicated pages for each project with images, videos, and detailed descriptions
- **Professional Timeline**: Display your work experience and academic background
- **Skills Section**: Organized skill categories with visual tags
- **GitHub Pages Ready**: No build process required, deploy directly to GitHub Pages

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main portfolio page
├── project.html            # Project detail template
├── css/
│   └── style.css          # All styles
├── js/
│   ├── main.js            # Main page functionality
│   └── projects.js        # Project detail page logic
├── data/
│   ├── experiences.json   # Professional & academic background
│   ├── skills.json        # Skills organized by category
│   └── projects.json      # Project information
├── assets/
│   └── projects/          # Project images and videos
│       ├── project-name/
│       │   ├── thumbnail.jpg
│       │   └── screenshot1.jpg
└── README.md
```

## 🛠️ Setup Instructions

### 1. Personal Information

Edit `index.html` to customize:
- Line 9: Update page title
- Line 18: Replace "Your Name" with your name
- Line 48: Update hero title and subtitle
- Line 60-63: Update about section text
- Lines 111-128: Update contact links (email, GitHub, LinkedIn)

### 2. Adding Professional Experience

Edit `data/experiences.json` in the `"professional"` array:

```json
{
  "title": "Your Job Title",
  "company": "Company Name",
  "startDate": "Jan 2023",
  "endDate": "Present",
  "description": "Brief description of your role and achievements."
}
```

### 3. Adding Academic Background

Edit `data/experiences.json` in the `"academic"` array:

```json
{
  "degree": "Master's Degree in Computer Science",
  "institution": "University Name",
  "startDate": "2020",
  "endDate": "2022",
  "description": "Focus areas and achievements during your studies."
}
```

### 4. Adding Skills

Edit `data/skills.json` to add or modify skill categories:

```json
{
  "name": "Category Name",
  "icon": "🎮",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
```

Available icons: 🎮 🎨 💻 🔧 🕹️ ⚙️ or any emoji

### 5. Adding Projects

#### Step 1: Add Project Data

Edit `data/projects.json`:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "shortDescription": "Brief one-line description for the card",
  "fullDescription": "Detailed description for the project page",
  "thumbnail": "assets/projects/project-folder/thumbnail.jpg",
  "tags": ["Unity", "C#", "Mobile"],
  "year": "2023",
  "platform": "PC, Mobile",
  "role": "Lead Developer",
  "media": [
    {
      "type": "image",
      "url": "../assets/projects/project-folder/screenshot1.jpg",
      "caption": "Description of this image"
    },
    {
      "type": "video",
      "url": "../assets/projects/project-folder/demo.mp4",
      "caption": "Gameplay demonstration"
    },
    {
      "type": "youtube",
      "videoId": "YouTube_Video_ID",
      "caption": "Trailer"
    }
  ],
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "technologies": [
    "Unity",
    "C#",
    "Photon"
  ],
  "challenges": "Description of challenges faced and how you solved them.",
  "links": [
    {
      "label": "Play on Steam",
      "url": "https://your-game-url.com"
    }
  ]
}
```

#### Step 2: Add Project Assets

1. Create a folder: `assets/projects/your-project-name/`
2. Add your images and videos to this folder
3. Recommended image size: 1920x1080 for screenshots, 800x600 for thumbnails
4. Supported formats: JPG, PNG for images; MP4 for videos

#### Media Types Supported:
- **Images**: Local images from assets folder
- **Videos**: Local MP4 videos with controls
- **YouTube**: Embedded YouTube videos (just provide the video ID)

### 6. Customizing Colors

Edit CSS variables in `css/style.css` (lines 1-9):

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Accent color */
    --text-color: #1f2937;         /* Main text */
    --text-light: #6b7280;         /* Secondary text */
}
```

## 🌐 Deploying to GitHub Pages

### Option 1: From GitHub Website

1. Push your portfolio to a GitHub repository
2. Go to repository Settings → Pages
3. Under "Source", select the main branch
4. Click Save
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Using Git Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio commit"

# Add remote repository
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

Then enable GitHub Pages in repository settings.

## 📝 Quick Customization Checklist

- [ ] Update personal name in `index.html`
- [ ] Update hero section text
- [ ] Update about section
- [ ] Add your professional experiences
- [ ] Add your academic background
- [ ] Customize skills categories
- [ ] Add at least one project
- [ ] Add project images/videos
- [ ] Update contact links (email, GitHub, LinkedIn)
- [ ] Customize colors (optional)
- [ ] Add favicon (optional)

## 📱 Local Preview

⚠️ **Important**: You MUST use a local server to preview the portfolio. Opening `index.html` directly in a browser will cause CORS errors and the content won't load.

### Method 1: Python Server (Easiest)

If you have Python installed:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Method 2: Node.js Server

If you have Node.js installed:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
http-server
```

Then open: `http://localhost:8080`

### Method 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Method 4: Other Servers

- **PHP**: `php -S localhost:8000`
- **Ruby**: `ruby -run -e httpd . -p 8000`

## 🎨 Adding More Styling

The portfolio uses:
- **Font**: Poppins from Google Fonts
- **Icons**: Inline SVG icons for contacts
- **Animations**: Fade-in effects on scroll
- **Responsive**: Mobile-first design with hamburger menu

## 💡 Tips

1. **Image Optimization**: Compress images before uploading to improve loading times
2. **Video Hosting**: For large videos, consider using YouTube instead of hosting locally
3. **Regular Updates**: Keep your projects and experience up to date
4. **SEO**: Update meta tags in HTML for better search engine visibility
5. **Testing**: Test your portfolio on multiple devices before deployment

## 🐛 Troubleshooting

**Images not loading?**
- Check file paths are correct (case-sensitive on GitHub Pages)
- Ensure images are in the `assets/` folder
- Use forward slashes (/) in paths, not backslashes

**JSON errors?**
- Validate your JSON at [jsonlint.com](https://jsonlint.com)
- Check for missing commas or quotes
- Ensure proper array/object structure

**Projects not showing?**
- Open browser console (F12) to check for errors
- Verify `data/projects.json` is properly formatted
- Check that project IDs are unique

## 📄 License

Feel free to use this template for your personal portfolio. No attribution required.

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

---

**Happy coding! 🎮**
