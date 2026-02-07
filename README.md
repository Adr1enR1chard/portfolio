# Portfolio - Game Developer & 3D Specialist

A modern, responsive portfolio website showcasing game development and 3D graphics work. Built with HTML, CSS, and JavaScript, optimized for GitHub Pages deployment.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices with optimized layouts
- **Image Lightbox**: Click any image to view it in full size with carousel navigation
- **Mobile-Optimized Code**: Code snippets with responsive font sizing and smooth horizontal scrolling
- **Touch Support**: Swipe gestures for carousels and lightbox on mobile devices
- **Data-Driven Architecture**: Easy content management through JSON files
- **Project Timeline**: Chronological project showcase with images, videos, and detailed descriptions
- **Professional Timeline**: Display work experience and academic background
- **Skills Section**: Organized skill categories with visual tags
- **GitHub Pages Ready**: No build process required

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

## 🛠️ Managing Content

### Personal Information

Edit `index.html` to update:
- Line 9: Page title
- Line 18: Your name in navigation
- Line 48: Hero title and subtitle
- Line 60-63: About section text
- Lines 111-128: Contact links (email, GitHub, LinkedIn)

### Adding Professional Experience

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

### Adding Academic Background

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

### Adding Skills

Edit `data/skills.json` to add or modify skill categories:

```json
{
  "name": "Category Name",
  "icon": "🎮",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
```

Available icons: 🎮 🎨 💻 🔧 🕹️ ⚙️ or any emoji

### Adding Projects

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

### Customizing Colors

Edit CSS variables in `css/style.css` (lines 1-9):

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Accent color */
    --text-color: #1f2937;         /* Main text */
    --text-light: #6b7280;         /* Secondary text */
}
```

### Responsive Breakpoints

The portfolio adapts to different screen sizes:
- **Desktop**: 1025px and above (full desktop experience)
- **Tablet**: 769px - 1024px (optimized tablet layout)
- **Mobile Landscape/Portrait Tablet**: 481px - 768px (stacked layouts, hamburger menu)
- **Mobile Portrait**: 361px - 480px (compact mobile design)
- **Small Mobile**: 360px and below (minimal spacing for small devices)

## 🌐 Deployment to GitHub Pages

### Option 1: From GitHub Website

1. Push the portfolio to a GitHub repository
2. Go to repository Settings → Pages
3. Under "Source", select the main branch
4. Click Save
5. The site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Using Git Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Update portfolio"

# Add remote repository
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

Then enable GitHub Pages in repository settings.

## 📝 Content Management Checklist

- [ ] Update personal name in `index.html`
- [ ] Update hero section text
- [ ] Update about section
- [ ] Add professional experiences
- [ ] Add academic background
- [ ] Customize skills categories
- [ ] Add projects with images/videos
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

## 🎨 Styling

The portfolio uses:
- **Font**: Poppins from Google Fonts
- **Icons**: Inline SVG icons for contacts
- **Animations**: Fade-in effects on scroll, smooth transitions
- **Responsive**: Mobile-first design with hamburger menu
- **Timeline**: Chronological project display grouped by year
- **Lightbox**: Full-screen image viewer with keyboard and touch controls

### Interactive Features

**Image Lightbox**:
- Click on any project image to view it in full size
- Navigate between images using arrow buttons, keyboard arrows, or swipe gestures
- Press `Escape` or click outside to close
- Displays image counter and captions
- Fully responsive on all devices

**Mobile Navigation**:
- Hamburger menu on tablets and mobile devices
- Smooth slide-in animation
- Touch-optimized tap targets (minimum 44px)

**Code Snippets**:
- Syntax highlighting with Prism.js
- Responsive font sizes (smaller on mobile for better readability)
- Horizontal scroll with smooth touch scrolling
- Preserved formatting on all screen sizes

### Keyboard Shortcuts

**Project Carousel**:
- `←` / `→`: Navigate between slides

**Image Lightbox**:
- `←` / `→`: Navigate between images
- `Escape`: Close lightbox

## 💡 Best Practices

1. **Image Optimization**: Compress images before uploading to improve loading times
2. **Video Hosting**: For large videos, consider using YouTube instead of hosting locally
3. **Regular Updates**: Keep projects and experience up to date
4. **SEO**: Update meta tags in HTML for better search engine visibility
5. **Testing**: Test the portfolio on multiple devices before deployment
6. **Project Grouping**: Projects are automatically grouped and sorted by year (newest first)

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
- Ensure the local server is running

**Lightbox not working?**
- Make sure JavaScript is enabled in your browser
- Check that images have loaded completely
- Very small images (under 100x100px) are excluded from lightbox
- Open browser console to check for JavaScript errors

**Code snippets not displaying correctly?**
- Ensure Prism.js is loading properly (check Network tab in browser dev tools)
- Verify code blocks are wrapped in `<pre><code>` tags
- For syntax highlighting, add `class="language-xxx"` to `<code>` tag (e.g., `language-javascript`)

## 📄 License

MIT License - Free to use and modify.
**Happy coding! 🎮**
