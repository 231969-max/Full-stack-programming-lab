const axios = require("axios");

// High-fidelity country news headlines simulator
const getSimulatedNews = (countryCode) => {
    const cc = countryCode.toUpperCase();
    
    const generalNews = [
        {
            title: "Revolutionary Clean Energy Grid Goes Live, Powering Millions Sustainably",
            sourceName: "Global Green Tech",
            url: "https://example.com/clean-energy-grid",
            publishedAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
        },
        {
            title: "Global Medical Summit Announces Breakout Vaccine for Autoimmune Conditions",
            sourceName: "Health Science Journal",
            url: "https://example.com/autoimmune-vaccine",
            publishedAt: new Date(Date.now() - 3600000 * 5).toISOString() // 5 hours ago
        },
        {
            title: "Deep Space Telescope Uncovers Water-Rich Exoplanet in Nearby Habitable Zone",
            sourceName: "AstroScience Daily",
            url: "https://example.com/exoplanet-water",
            publishedAt: new Date(Date.now() - 3600000 * 9).toISOString()
        },
        {
            title: "Electric Aviation Milestone: Hybrid Regional Jet Completes First Cross-Country Flight",
            sourceName: "AeroTech Insights",
            url: "https://example.com/electric-flight",
            publishedAt: new Date(Date.now() - 3600000 * 12).toISOString()
        },
        {
            title: "Decentralized AI Networks Rise to Tackle Algorithmic Censorship",
            sourceName: "Future Web Digest",
            url: "https://example.com/decentralized-ai",
            publishedAt: new Date(Date.now() - 3600000 * 15).toISOString()
        },
        {
            title: "Quantum Computing Hardware achieves 99.9% Logic Gate Fidelity",
            sourceName: "Physics Horizon",
            url: "https://example.com/quantum-fidelity",
            publishedAt: new Date(Date.now() - 3600000 * 20).toISOString()
        }
    ];

    const pkNews = [
        {
            title: "IT Exports Surge by 35% in Current Fiscal Year as Tech Hubs Expand",
            sourceName: "Tech Pakistan",
            url: "https://example.pk/it-exports-growth",
            publishedAt: new Date().toISOString()
        },
        {
            title: "National Health Portal Launched, Streamlining Healthcare Records in Rural Areas",
            sourceName: "Pakistan Chronicle",
            url: "https://example.pk/national-health-portal",
            publishedAt: new Date(Date.now() - 3600000 * 3).toISOString()
        },
        {
            title: "Karakoram Highway Infrastructure Upgrade Prompts Eco-Tourism Boom",
            sourceName: "Travel & Heritage PK",
            url: "https://example.pk/tourism-boom",
            publishedAt: new Date(Date.now() - 3600000 * 8).toISOString()
        },
        {
            title: "Top Universities Partner with Global Research Labs for AI Innovation",
            sourceName: "Education Watch",
            url: "https://example.pk/ai-innovation-universities",
            publishedAt: new Date(Date.now() - 3600000 * 14).toISOString()
        },
        {
            title: "Solar Energy Microgrids Empower Off-Grid Communities in Balochistan",
            sourceName: "Balochistan Renewable News",
            url: "https://example.pk/solar-microgrids",
            publishedAt: new Date(Date.now() - 3600000 * 21).toISOString()
        }
    ];

    const usNews = [
        {
            title: "Federal Reserve Holds Rates Steady, Pointing to Stabilizing Productivity Gains",
            sourceName: "Wall Street Beacon",
            url: "https://example.com/fed-rate-stable",
            publishedAt: new Date().toISOString()
        },
        {
            title: "NASA Mars Rover Extracts Record Oxygen Volumes from Atmosphere",
            sourceName: "Space Tech American",
            url: "https://example.com/nasa-oxygen-mars",
            publishedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
            title: "Major US Cities Adopt Smart Traffic Control Platforms, Slashing Commute Times",
            sourceName: "Urban Dynamics Review",
            url: "https://example.com/smart-traffic-commutes",
            publishedAt: new Date(Date.now() - 3600000 * 7).toISOString()
        },
        {
            title: "Silicon Valley Consortium Proposes Open Standards for Ethical Neural Nets",
            sourceName: "Silicon Wire",
            url: "https://example.com/ethical-neural-standards",
            publishedAt: new Date(Date.now() - 3600000 * 11).toISOString()
        },
        {
            title: "Bioluminescent Urban Forestry Pilot Begins in Seattle Parks",
            sourceName: "Pacific Northwest Daily",
            url: "https://example.com/bioluminescent-forestry",
            publishedAt: new Date(Date.now() - 3600000 * 18).toISOString()
        }
    ];

    const gbNews = [
        {
            title: "Fusion Research Center in Oxfordshire Records Unprecedented Energy Output Duration",
            sourceName: "UK Science Dispatch",
            url: "https://example.co.uk/fusion-record",
            publishedAt: new Date().toISOString()
        },
        {
            title: "London Tech Corridor Welcomes Record Startup Influx in Fintech and Biotech",
            sourceName: "British Business Press",
            url: "https://example.co.uk/fintech-record-startup",
            publishedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
            title: "NHS Integrates Advanced Neural Diagnostics for Early Detection Protocols",
            sourceName: "British Medical Circular",
            url: "https://example.co.uk/nhs-neural-diagnostics",
            publishedAt: new Date(Date.now() - 3600000 * 10).toISOString()
        },
        {
            title: "Wind Power Reaches New Milestone, Providing Over 60% of National Grid Capacity",
            sourceName: "Clean Energy UK",
            url: "https://example.co.uk/wind-power-milestone",
            publishedAt: new Date(Date.now() - 3600000 * 16).toISOString()
        }
    ];

    if (cc === "PK") return pkNews;
    if (cc === "US") return usNews;
    if (cc === "GB" || cc === "UK") return gbNews;
    return generalNews;
};

exports.getTopHeadlines = async (req, res) => {
    const country = req.params.country || req.query.country || "US";
    const cleanCountry = country.trim().toLowerCase();

    // Check country code validity
    if (!cleanCountry || cleanCountry.length !== 2) {
        return res.status(400).json({ message: "Invalid country code. Must be a 2-character ISO country code (e.g. US, PK, GB)" });
    }

    const apiKey = process.env.NEWS_API_KEY;

    if (apiKey && apiKey !== "YOUR_NEWS_API_KEY") {
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=${cleanCountry}&apiKey=${apiKey}`;
            const response = await axios.get(url);
            
            // Format response: news title, source name, URL, publication date. Limit 5-10
            const articles = response.data.articles.slice(0, 10).map(art => ({
                title: art.title,
                sourceName: art.source ? art.source.name : "Unknown Source",
                url: art.url,
                publishedAt: art.publishedAt
            }));

            return res.json(articles);
        } catch (error) {
            console.warn("News API query failed, falling back to simulator:", error.message);
        }
    }

    // Default simulation fallback
    const mockNews = getSimulatedNews(cleanCountry);
    return res.json(mockNews);
};
