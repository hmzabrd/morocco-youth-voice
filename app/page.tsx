"use client"

import { Button } from "@/components/ui/button"
import InteractiveMap from "@/components/InteractiveMap"
import { cities, protestDates } from "@/lib/cities"
import { Card } from "@/components/ui/card"
import {
  MapPin,
  Users,
  HelpCircle,
  FileText,
  Twitter,
  Instagram,
  MessageCircle,
  Share2,
  Clock,
  CheckCircle,
  X,
  AlertTriangle,
  Shield,
  Menu,
  ChevronDown,
  Globe,
  Moon,
  Sun,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [language, setLanguage] = useState<"fr" | "ar">("fr")
  const [darkMode, setDarkMode] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    setIsClient(true)
    const savedLang = localStorage.getItem("language") as "fr" | "ar" | null
    if (savedLang === "fr" || savedLang === "ar") {
      setLanguage(savedLang)
    }
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("language", language)
      document.documentElement.setAttribute("lang", language)
      document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr")
    }
  }, [language, isClient])

  useEffect(() => {
    const targetDate = new Date("2025-09-27T18:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const translations = {
    fr: {
      title: "Morocco Youth Voice",
      subtitle: "صوت الشباب المغربي",
      heroTitle: "Pour une éducation et une santé dignes",
      heroSubtitle: "من أجل تعليم وصحة كريمين",
      joinMovement: "Rejoignez le Mouvement",
      countdown: "Compte à rebours",
      countdownUntil: "Jusqu'aux actions du 27-28 septembre 2025",
      days: "Jours",
      hours: "Heures",
      minutes: "Minutes",
      seconds: "Secondes",
      discoverActions: "Découvrir les Actions",
      ourObjectives: "Nos Objectifs",
      interactiveMap: "Carte Interactive des Actions",
      objectives: "Nos Objectifs",
      participationRules: "Règles de Participation",
      ethicalFAQ: "FAQ Éthique",
      education: "Éducation",
      health: "Santé",
      educationDesc: "Pour un système éducatif digne du 21ème siècle",
      healthDesc: "Pour un système de santé accessible et efficace",
    },
    ar: {
      title: "صوت الشباب المغربي",
      subtitle: "Morocco Youth Voice",
      heroTitle: "من أجل تعليم وصحة كريمين",
      heroSubtitle: "Pour une éducation et une santé dignes",
      joinMovement: "انضموا إلى الحركة",
      countdown: "العد التنازلي",
      countdownUntil: "حتى أعمال 27-28 سبتمبر 2025",
      days: "أيام",
      hours: "ساعات",
      minutes: "دقائق",
      seconds: "ثواني",
      discoverActions: "اكتشف الأعمال",
      ourObjectives: "أهدافنا",
      interactiveMap: "خريطة الأعمال التفاعلية",
      objectives: "أهدافنا",
      participationRules: "قواعد المشاركة",
      ethicalFAQ: "الأسئلة الأخلاقية الشائعة",
      education: "التعليم",
      health: "الصحة",
      educationDesc: "من أجل نظام تعليمي يليق بالقرن الحادي والعشرين",
      healthDesc: "من أجل نظام صحي متاح وفعال",
    },
  }

  const t = translations[language]

  const faqData =
    language === "fr"
      ? [
          {
            question: "Quels sont les objectifs de ce mouvement ?",
            answer:
              "Notre mouvement vise à améliorer l'éducation et la santé publique au Maroc. Nous demandons des réformes concrètes pour garantir un accès équitable à une éducation de qualité et des soins de santé dignes pour tous les citoyens marocains.",
          },
          {
            question: "Comment garantissez-vous le caractère pacifique des manifestations ?",
            answer:
              "Nous avons mis en place des règles strictes de participation, des coordinateurs formés sur chaque site, et nous collaborons avec les autorités locales. Toute forme de violence entraîne l'exclusion immédiate du mouvement.",
          },
          {
            question: "Qui peut participer à ce mouvement ?",
            answer:
              "Tous les citoyens marocains et résidents qui partagent nos valeurs de non-violence, de respect et d'amélioration des services publics peuvent participer, sans distinction d'âge, de genre, de religion ou d'origine sociale.",
          },
          {
            question: "Comment les fonds du mouvement sont-ils gérés ?",
            answer:
              "Nous fonctionnons uniquement grâce aux contributions volontaires. Tous les comptes sont transparents et audités. Aucun fonds n'est utilisé à des fins personnelles - tout va vers l'organisation des événements et la communication.",
          },
          {
            question: "Quelle est votre position vis-à-vis des partis politiques ?",
            answer:
              "Nous sommes un mouvement citoyen indépendant, non affilié à aucun parti politique. Notre seul objectif est l'amélioration des services publics d'éducation et de santé, au-delà des clivages politiques.",
          },
          {
            question: "Comment respectez-vous l'environnement lors des manifestations ?",
            answer:
              "Nous encourageons l'utilisation de transports en commun, interdisons les déchets plastiques, et organisons le nettoyage systématique des lieux après chaque rassemblement. L'écologie fait partie de nos valeurs.",
          },
          {
            question: "Que faire en cas de provocation ou de violence ?",
            answer:
              "Contactez immédiatement les coordinateurs identifiés par leurs brassards. Éloignez-vous de toute situation conflictuelle et suivez les instructions des responsables. La sécurité de tous est notre priorité absolue.",
          },
          {
            question: "Comment protégez-vous les données personnelles des participants ?",
            answer:
              "Nous ne collectons aucune donnée personnelle obligatoire. Les inscriptions aux plateformes sont volontaires et nous respectons strictement le RGPD. Aucune information n'est partagée avec des tiers.",
          },
        ]
      : [
          {
            question: "ما هي أهداف هذه الحركة؟",
            answer:
              "تهدف حركتنا إلى تحسين التعليم والصحة العامة في المغرب. نطالب بإصلاحات ملموسة لضمان الوصول العادل إلى تعليم جيد ورعاية صحية كريمة لجميع المواطنين المغاربة.",
          },
          {
            question: "كيف تضمنون الطابع السلمي للمظاهرات؟",
            answer:
              "وضعنا قواعد صارمة للمشاركة، ومنسقين مدربين في كل موقع، ونتعاون مع السلطات المحلية. أي شكل من أشكال العنف يؤدي إلى الاستبعاد الفوري من الحركة.",
          },
          {
            question: "من يمكنه المشاركة في هذه الحركة؟",
            answer:
              "جميع المواطنين المغاربة والمقيمين الذين يشاركوننا قيم اللاعنف والاحترام وتحسين الخدمات العامة يمكنهم المشاركة، دون تمييز في العمر أو الجنس أو الدين أو الأصل الاجتماعي.",
          },
          {
            question: "كيف تُدار أموال الحركة؟",
            answer:
              "نعمل فقط بفضل المساهمات الطوعية. جميع الحسابات شفافة ومراجعة. لا تُستخدم أي أموال لأغراض شخصية - كل شيء يذهب لتنظيم الأحداث والتواصل.",
          },
          {
            question: "ما هو موقفكم من الأحزاب السياسية؟",
            answer:
              "نحن حركة مواطنة مستقلة، غير منتمية لأي حزب سياسي. هدفنا الوحيد هو تحسين الخدمات العامة للتعليم والصحة، بعيداً عن الانقسامات السياسية.",
          },
          {
            question: "كيف تحترمون البيئة أثناء المظاهرات؟",
            answer:
              "نشجع استخدام وسائل النقل العام، ونمنع النفايات البلاستيكية، وننظم التنظيف المنهجي للأماكن بعد كل تجمع. البيئة جزء من قيمنا.",
          },
          {
            question: "ماذا نفعل في حالة الاستفزاز أو العنف؟",
            answer:
              "اتصلوا فوراً بالمنسقين المحددين بأشرطة أذرعهم. ابتعدوا عن أي وضع صراعي واتبعوا تعليمات المسؤولين. سلامة الجميع هي أولويتنا المطلقة.",
          },
          {
            question: "كيف تحمون البيانات الشخصية للمشاركين؟",
            answer:
              "لا نجمع أي بيانات شخصية إلزامية. التسجيل في المنصات طوعي ونحترم بدقة قانون حماية البيانات. لا تُشارك أي معلومات مع أطراف ثالثة.",
          },
        ]

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gray-50"} ${language === "ar" ? "rtl" : "ltr"}`}
    >
      {/* Header */}
      <header
        className={`shadow-sm sticky top-0 z-50 transition-colors duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="text-center">
                <h1
                  className={`text-lg font-bold transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {t.title}
                </h1>
                <p className={`text-xs transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {t.subtitle}
                </p>
              </div>
            </button>

            {/* Controls and Desktop Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors duration-300 ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-yellow-400" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setLanguage(language === "fr" ? "ar" : "fr")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === "fr" ? "العربية" : "Français"}</span>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection("carte")}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{t.interactiveMap}</span>
                </button>
                <button
                  onClick={() => scrollToSection("objectifs")}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{t.objectives}</span>
                </button>
                <button
                  onClick={() => scrollToSection("regles")}
                  className={`flex items-center space-x-2 transition-colors ${darkMode ? "text-gray-300 hover:text-gray-200" : "text-gray-600 hover:text-gray-700"}`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{t.participationRules}</span>
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm">{t.ethicalFAQ}</span>
                </button>
              </nav>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu
                className={`w-6 h-6 transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              />
            </button>
          </div>

          {/* Mobile navigation menu */}
          {mobileMenuOpen && (
            <div
              className={`md:hidden border-t py-4 transition-colors duration-300 ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("carte")}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors text-left"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{t.interactiveMap}</span>
                </button>
                <button
                  onClick={() => scrollToSection("objectifs")}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors text-left"
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{t.objectives}</span>
                </button>
                <button
                  onClick={() => scrollToSection("regles")}
                  className={`flex items-center space-x-2 transition-colors text-left ${darkMode ? "text-gray-300 hover:text-gray-200" : "text-gray-600 hover:text-gray-700"}`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{t.participationRules}</span>
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors text-left"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm">{t.ethicalFAQ}</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-green-600 rounded-2xl p-12 mb-8 shadow-2xl">
            <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
            <div className="relative z-10 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.heroTitle}</h2>
              <p className="text-lg opacity-90">{t.heroSubtitle}</p>
            </div>
          </div>

          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 animate-slide-up transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            {t.title}
          </h1>
          <p
            className={`text-xl md:text-2xl mb-4 animate-slide-up transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            style={{ animationDelay: "0.2s" }}
          >
            {t.subtitle}
          </p>

          <p
            className={`text-lg max-w-4xl mx-auto mb-8 leading-relaxed animate-slide-up transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            style={{ animationDelay: "0.4s" }}
          >
            {language === "fr"
              ? "Un mouvement citoyen pacifique né de la frustration de toute une génération face aux défaillances de notre système éducatif et de santé publique. Nous, jeunes Marocains, refusons de rester silencieux devant l'inégalité d'accès à une éducation de qualité et aux soins de santé dignes. Notre voix s'élève aujourd'hui pour exiger des réformes concrètes, transparentes et durables. Ensemble, nous construisons l'avenir que nous méritons, un avenir où chaque citoyen marocain, peu importe son origine sociale ou géographique, peut accéder aux services publics fondamentaux. Ce n'est pas seulement un mouvement de protestation, c'est un appel à l'action collective pour transformer notre société et garantir la dignité de tous."
              : "حركة مواطنة سلمية ولدت من إحباط جيل كامل أمام أوجه القصور في نظامنا التعليمي والصحي العام. نحن، الشباب المغاربة، نرفض البقاء صامتين أمام عدم المساواة في الوصول إلى تعليم جيد ورعاية صحية كريمة. ترتفع أصواتنا اليوم للمطالبة بإصلاحات ملموسة وشفافة ومستدامة. معاً، نبني المستقبل الذي نستحقه، مستقبل يمكن فيه لكل مواطن مغربي، بغض النظر عن أصله الاجتماعي أو الجغرافي، الوصول إلى الخدمات العامة الأساسية. هذه ليست مجرد حركة احتجاج، إنها دعوة للعمل الجماعي لتحويل مجتمعنا وضمان كرامة الجميع."}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              onClick={() => scrollToSection("carte")}
              className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {t.discoverActions}
            </Button>
            <Button
              onClick={() => scrollToSection("objectifs")}
              variant="outline"
              className={`border-2 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${darkMode ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800 text-white" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
            >
              {t.ourObjectives}
            </Button>
          </div>
        </div>

        {/* Social Media Section */}
        <section
          className={`mb-16 text-center rounded-2xl p-8 shadow-xl transition-colors duration-300 ${darkMode ? "bg-gradient-to-br from-gray-800 via-gray-800 to-gray-700" : "bg-gradient-to-br from-red-50 via-white to-green-50"}`}
        >
          <h2
            className={`text-3xl font-bold mb-6 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            {t.joinMovement}
          </h2>

          <div className="mb-8 bg-gradient-to-r from-red-600 to-green-600 rounded-2xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-4">{t.countdown}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm opacity-90">{t.days}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm opacity-90">{t.hours}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm opacity-90">{t.minutes}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm opacity-90">{t.seconds}</div>
              </div>
            </div>
            <p className="mt-4 text-lg opacity-90">{t.countdownUntil}</p>
          </div>

          <p
            className={`text-lg mb-6 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            {language === "fr"
              ? "Votre voix compte. Votre participation fait la différence. Dans un monde où les réseaux sociaux peuvent être des outils de changement positif, nous utilisons ces plateformes pour rassembler, informer et mobiliser. Chaque partage, chaque like, chaque commentaire contribue à amplifier notre message et à sensibiliser davantage de personnes à nos revendications légitimes. Nous croyons en la force de la communauté digitale pour créer un impact réel dans le monde physique. Rejoignez-nous sur nos différentes plateformes pour rester informé des dernières actions, participer aux discussions constructives, et contribuer à bâtir un mouvement citoyen fort et uni."
              : "صوتكم مهم. مشاركتكم تحدث الفرق. في عالم يمكن أن تكون فيه وسائل التواصل الاجتماعي أدوات للتغيير الإيجابي، نستخدم هذه المنصات للتجمع والإعلام والتعبئة. كل مشاركة، كل إعجاب، كل تعليق يساهم في تضخيم رسالتنا وتوعية المزيد من الناس بمطالبنا المشروعة. نؤمن بقوة المجتمع الرقمي لخلق تأثير حقيقي في العالم المادي. انضموا إلينا على منصاتنا المختلفة للبقاء على اطلاع بآخر الأعمال، والمشاركة في النقاشات البناءة، والمساهمة في بناء حركة مواطنة قوية وموحدة."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              onClick={() => window.open("https://discord.gg/jWQXqWq5vD", "_blank")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Discord</span>
            </Button>
            <Button
              onClick={() => window.open("https://x.com/moroccan_voice1", "_blank")}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
            >
              <Twitter className="w-5 h-5" />
              <span>Twitter</span>
            </Button>
            <Button
              onClick={() =>
                window.open("https://www.instagram.com/genz_anti_corruption?igsh=MWZkaG9ydzM3YTE1aw==", "_blank")
              }
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </Button>
            <Button
              onClick={() => window.open("https://t.me/+0yDZbpN0LVwwZGI0", "_blank")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
            >
              <Share2 className="w-5 h-5" />
              <span>Telegram</span>
            </Button>
            <Button
              onClick={() => window.open("https://www.tiktok.com/@moroccangenzvscorruption?_t=ZS-8zpx59YL6OI&_r=1")}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
            >
              <Share2 className="w-5 h-5" />
              <span>TikTok</span> 
            </Button>
          </div>

        </section>

        {/* Carte Interactive Section */}
        <section id="carte" className="mb-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t.interactiveMap}
            </h2>

            <p
              className={`text-lg max-w-4xl mx-auto leading-relaxed transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {language === "fr"
                ? "À travers tout le royaume, de Tanger à Agadir, de Casablanca à Oujda, notre mouvement prend racine dans chaque ville, chaque quartier, chaque cœur qui bat pour un Maroc meilleur. Cette carte représente bien plus que des coordonnées géographiques - elle symbolise l'unité de notre peuple autour de valeurs communes : l'éducation pour tous, la santé accessible, la dignité préservée. Chaque point sur cette carte raconte l'histoire d'une communauté qui refuse l'indifférence, qui choisit l'action pacifique plutôt que la résignation. Découvrez les manifestations, rassemblements et actions organisées dans votre région, et rejoignez vos concitoyens dans cette démarche historique pour transformer notre société."
                : "عبر المملكة كلها، من طنجة إلى أكادير، من الدار البيضاء إلى وجدة، تتجذر حركتنا في كل مدينة، كل حي، كل قلب ينبض من أجل مغرب أفضل. هذه الخريطة تمثل أكثر من مجرد إحداثيات جغرافية - إنها ترمز إلى وحدة شعبنا حول قيم مشتركة: التعليم للجميع، الصحة المتاحة، الكرامة المحفوظة. كل نقطة على هذه الخريطة تحكي قصة مجتمع يرفض اللامبالاة، يختار العمل السلمي بدلاً من الاستسلام. اكتشفوا المظاهرات والتجمعات والأعمال المنظمة في منطقتكم، وانضموا إلى مواطنيكم في هذا المسعى التاريخي لتحويل مجتمعنا."}
            </p>
          </div>

          <div className={`rounded-lg shadow-lg p-4 md:p-6 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <InteractiveMap cities={cities as any} protestDates={protestDates as any} lang={language} />
          </div>

          {/* Removed duplicate city cards (e.g., Oujda, Nador) to avoid duplication with map/list */}
        </section>

        {/* Objectifs Section */}
        <section id="objectifs" className="mb-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t.objectives}
            </h2>

            <p
              className={`text-lg max-w-4xl mx-auto leading-relaxed transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {language === "fr"
                ? "Nos revendications ne sont pas des caprices de jeunesse, mais des nécessités vitales pour l'avenir de notre nation. Elles naissent de l'observation quotidienne des inégalités, des témoignages de familles qui peinent à scolariser leurs enfants dans de bonnes conditions, des récits de patients qui attendent des heures dans des hôpitaux sous-équipés. Nos objectifs sont concrets, mesurables et réalisables. Ils s'inspirent des meilleures pratiques internationales tout en respectant nos spécificités culturelles et nos ressources nationales. Nous ne demandons pas l'impossible, nous exigeons le minimum décent auquel tout citoyen marocain a droit."
                : "مطالبنا ليست نزوات شبابية، بل ضرورات حيوية لمستقبل أمتنا. تنبع من الملاحظة اليومية للتفاوتات، من شهادات العائلات التي تكافح لتعليم أطفالها في ظروف جيدة، من قصص المرضى الذين ينتظرون ساعات في مستشفيات ناقصة التجهيز. أهدافنا ملموسة وقابلة للقياس والتحقيق. تستلهم من أفضل الممارسات الدولية مع احترام خصوصياتنا الثقافية ومواردنا الوطنية. لا نطلب المستحيل، نطالب بالحد الأدنى اللائق الذي يحق لكل مواطن مغربي."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 shadow-lg">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">{t.education}</h3>
                <p className="text-sm opacity-90 mb-4">{t.educationDesc}</p>

                <p className="text-blue-100 leading-relaxed">
                  {language === "fr"
                    ? "Nous exigeons une révolution éducative qui place l'apprenant au centre du système. Cela signifie des classes moins surchargées, des enseignants mieux formés et mieux rémunérés, des infrastructures modernes et sécurisées, des programmes adaptés aux défis contemporains. Nous voulons que chaque enfant marocain, qu'il vive dans les quartiers huppés de Rabat ou dans les villages reculés de l'Atlas, ait accès à la même qualité d'enseignement. L'éducation n'est pas un privilège, c'est un droit fondamental qui conditionne l'avenir de notre pays."
                    : "نطالب بثورة تعليمية تضع المتعلم في مركز النظام. هذا يعني فصول أقل اكتظاظاً، ومعلمين أفضل تدريباً وأجراً، وبنية تحتية حديثة وآمنة، وبرامج تتكيف مع التحديات المعاصرة. نريد أن يحصل كل طفل مغربي، سواء كان يعيش في أحياء الرباط الراقية أو في قرى الأطلس النائية، على نفس جودة التعليم. التعليم ليس امتيازاً، إنه حق أساسي يحدد مستقبل بلدنا."}
                </p>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 shadow-lg">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">{t.health}</h3>
                <p className="text-sm opacity-90 mb-4">{t.healthDesc}</p>

                <p className="text-red-100 leading-relaxed">
                  {language === "fr"
                    ? "La santé ne devrait jamais être un luxe. Nous réclamons un système de santé publique qui garantit des soins de qualité à tous les citoyens, indépendamment de leur situation financière. Cela implique des hôpitaux mieux équipés, un personnel médical en nombre suffisant, des médicaments accessibles, et une médecine préventive renforcée. Nous voulons que chaque Marocain puisse se soigner dans la dignité, sans avoir à choisir entre sa santé et ses finances. Un peuple en bonne santé est un peuple productif et épanoui."
                    : "الصحة يجب ألا تكون أبداً رفاهية. نطالب بنظام صحة عامة يضمن رعاية جيدة لجميع المواطنين، بغض النظر عن وضعهم المالي. هذا يتطلب مستشفيات أفضل تجهيزاً، وطاقماً طبياً كافياً، وأدوية متاحة، وطباً وقائياً معززاً. نريد أن يتمكن كل مغربي من العلاج بكرامة، دون الاضطرار للاختيار بين صحته وأمواله. الشعب الصحي شعب منتج ومزدهر."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Règles Section */}
        <section id="regles" className="mb-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t.participationRules}
            </h2>

            <p
              className={`text-lg max-w-4xl mx-auto leading-relaxed transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {language === "fr"
                ? "Notre force réside dans notre discipline et notre engagement envers la non-violence. Ces règles ne sont pas des contraintes, mais les fondements qui garantissent la légitimité et l'efficacité de notre mouvement. Elles reflètent nos valeurs profondes : le respect de l'autre, la responsabilité collective, et la conviction que le changement durable ne peut naître que de la paix et du dialogue constructif. En respectant ces principes, nous montrons que nous sommes des citoyens matures, capables de porter un projet de société cohérent et responsable. Chaque participant devient un ambassadeur de nos valeurs et contribue à construire l'image positive de notre mouvement."
                : "قوتنا تكمن في انضباطنا والتزامنا باللاعنف. هذه القواعد ليست قيوداً، بل الأسس التي تضمن شرعية وفعالية حركتنا. تعكس قيمنا العميقة: احترام الآخر، المسؤولية الجماعية، والاقتناع بأن التغيير المستدام لا يمكن أن ينبع إلا من السلام والحوار البناء. باحترام هذه المبادئ، نظهر أننا مواطنون ناضجون، قادرون على حمل مشروع مجتمعي متماسك ومسؤول. كل مشارك يصبح سفيراً لقيمنا ويساهم في بناء الصورة الإيجابية لحركتنا."}
            </p>
          </div>

          <div
            className={`rounded-2xl p-8 shadow-xl transition-colors duration-300 ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-700" : "bg-gradient-to-br from-gray-50 to-white"}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Comportement Pacifique
                    </h3>
                    <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Aucune violence physique ou verbale tolérée. Respect mutuel obligatoire.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Respect des Lieux
                    </h3>
                    <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Préservation de l'environnement et nettoyage après chaque événement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Collaboration
                    </h3>
                    <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Coopération avec les autorités locales et les forces de l'ordre.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Interdictions
                    </h3>
                    <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Aucun slogan politique partisan, religieux discriminatoire ou haineux.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Sécurité
                    </h3>
                    <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Suivre les instructions des coordinateurs identifiés par leurs brassards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Confidentialité
                    </h3>
                    <p className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Respect de la vie privée et protection des données personnelles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t.ethicalFAQ}
            </h2>

            <p
              className={`text-lg max-w-4xl mx-auto leading-relaxed transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {language === "fr"
                ? "La transparence est l'une de nos valeurs cardinales. Nous croyons que chaque citoyen a le droit de comprendre nos motivations, nos méthodes, et nos objectifs. Cette section répond aux questions les plus fréquemment posées sur notre mouvement, nos principes éthiques, et notre vision de l'avenir. Nous n'avons rien à cacher car notre cause est juste et nos méthodes sont honorables. Si vous avez d'autres questions, n'hésitez pas à nous contacter via nos réseaux sociaux. Le dialogue ouvert et honnête est la base de toute démocratie saine."
                : "الشفافية إحدى قيمنا الأساسية. نؤمن بأن لكل مواطن الحق في فهم دوافعنا وأساليبنا وأهدافنا. يجيب هذا القسم على الأسئلة الأكثر تكراراً حول حركتنا ومبادئنا الأخلاقية ورؤيتنا للمستقبل. ليس لدينا ما نخفيه لأن قضيتنا عادلة وأساليبنا شريفة. إذا كانت لديكم أسئلة أخرى، لا تترددوا في الاتصال بنا عبر شبكاتنا الاجتماعية. الحوار المفتوح والصادق أساس كل ديمقراطية سليمة."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <Card
                key={index}
                className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : ""}`}
              >
                <button
                  className={`w-full p-6 text-left flex items-center justify-between transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <h3
                    className={`text-lg font-semibold pr-4 transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-all duration-200 ${darkMode ? "text-gray-400" : "text-gray-500"} ${
                      expandedFAQ === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFAQ === index && (
                  <div
                    className={`px-6 pb-6 border-t transition-colors duration-300 ${darkMode ? "border-gray-700" : "border-gray-100"}`}
                  >
                    <p
                      className={`leading-relaxed pt-4 transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

      </main>

      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 space-y-4">
        <div
          className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-110 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
          onClick={() => window.open("https://discord.gg/jWQXqWq5vD", "_blank")}
          role="button"
          aria-label="Rejoindre Discord"
        >
          <MessageCircle className="w-6 h-6 text-indigo-600" />
        </div>
        <div
          className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-110 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
          onClick={() => window.open("https://x.com/moroccan_voice1", "_blank")}
          role="button"
          aria-label="Suivre sur Twitter"
        >
          <Twitter className="w-6 h-6 text-gray-900" />
        </div>
        <div
          className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-110 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
          onClick={() =>
            window.open("https://www.instagram.com/genz_anti_corruption?igsh=MWZkaG9ydzM3YTE1aw==", "_blank")
          }
          role="button"
          aria-label="Suivre sur Instagram"
        >
          <Instagram className="w-6 h-6 text-pink-600" />
        </div>
        <div
          className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-110 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
          onClick={() => window.open("https://t.me/+0yDZbpN0LVwwZGI0", "_blank")}
          role="button"
          aria-label="Rejoindre Telegram"
        >
          <Share2 className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Built with v0 Badge */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-black text-white px-3 py-1 rounded-full text-xs flex items-center space-x-2">
          <span>Built with</span>
          <span className="font-bold">v0</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  )
}
