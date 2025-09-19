"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

type Feature = {
	type: "Feature"
	properties: {
		id: string
		fr: string
		ar: string
		venue: string
		time: string
		date_fr: string
		date_ar: string
		icon: string
	}
	geometry: { type: "Point"; coordinates: [number, number] }
}

type FeatureCollection = { type: "FeatureCollection"; features: Feature[] }

type Props = {
    cities: FeatureCollection
    protestDates: string[]
    lang: "fr" | "ar"
}

function buildICS(protestDates: string[]) {
	const uid = Date.now()
	const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Moroccan Youth Voice//EN"]
	protestDates.forEach((iso, i) => {
		const dt = new Date(iso)
		const dtstart = dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
		const dtend = new Date(dt.getTime() + 2 * 60 * 60 * 1000)
			.toISOString()
			.replace(/[-:]/g, "")
			.split(".")[0] + "Z"
		lines.push("BEGIN:VEVENT")
		lines.push(`UID:${uid}-${i}@myv.local`)
		lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`)
		lines.push(`DTSTART:${dtstart}`)
		lines.push(`DTEND:${dtend}`)
		lines.push("SUMMARY:Moroccan Youth Voice — Protest")
		lines.push("DESCRIPTION:Rejoignez-nous — Join us")
		lines.push("END:VEVENT")
	})
	lines.push("END:VCALENDAR")
	const blob = new Blob([lines.join("\n")], { type: "text/calendar" })
	return URL.createObjectURL(blob)
}

function getNextDateISO(protestDates: string[]) {
	const now = Date.now()
	const next = protestDates.map((d) => new Date(d)).find((d) => d.getTime() > now) ?? new Date(protestDates[0])
	return next.toISOString()
}

// Theme is controlled globally by the top bar; no local theme handling here.

export function InteractiveMap({ cities, protestDates, lang }: Props) {
	const mapRef = useRef<any>(null)
	const canvasRef = useRef<HTMLDivElement | null>(null)
	const ioRef = useRef<IntersectionObserver | null>(null)

    // Language and theme come from the parent. No local persistence here.

	const icsUrl = useMemo(() => buildICS(protestDates), [protestDates])

	const liveBadgeText = useMemo(() => {
		const next = new Date(getNextDateISO(protestDates)).getTime()
		const days = Math.ceil((next - Date.now()) / 86400000)
		return lang === "ar" ? (days > 0 ? `تبقّى ${days} يومًا` : "اليوم") : days > 0 ? `${days} jours restants` : "Aujourd’hui"
	}, [protestDates, lang])

	const [countdown, setCountdown] = useState(() => {
		const next = new Date(getNextDateISO(protestDates)).getTime()
		return Math.max(0, next - Date.now())
	})
	useEffect(() => {
		const id = setInterval(() => {
			const next = new Date(getNextDateISO(protestDates)).getTime()
			setCountdown(Math.max(0, next - Date.now()))
		}, 1000)
		return () => clearInterval(id)
	}, [protestDates])
	const s = Math.floor(countdown / 1000)
	const d = Math.floor(s / 86400)
	const h = Math.floor((s % 86400) / 3600)
	const m = Math.floor((s % 3600) / 60)
	const ss = s % 60

	useEffect(() => {
		if (!canvasRef.current) return
		let cleanup: (() => void) | undefined

		const ensureMap = async () => {
			if (mapRef.current) {
				mapRef.current.remove()
				mapRef.current = null
			}
			const L = await import("leaflet")

			const map = L.map(canvasRef.current as HTMLDivElement, { zoomControl: true }).setView([31.79, -6.83], 6)
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution: "&copy; OpenStreetMap contributors",
			}).addTo(map)

			cities.features.forEach((f) => {
				const [lng, lat] = f.geometry.coordinates
				const cityName = lang === "ar" ? f.properties.ar : f.properties.fr
				const dateStr = lang === "ar" ? f.properties.date_ar : f.properties.date_fr
				const mapsLabel = lang === "ar" ? "خرائط" : "Maps"
				const flyLabel = lang === "ar" ? "انتقال" : "Fly to"

				const icon = L.divIcon({
					className: "pulse-wrapper",
					html: `<div class="pulse" title="${cityName}"></div>`,
					iconSize: [18, 18],
					iconAnchor: [9, 9],
				})

				const popupHtml = `
					<div class='text-sm'>
						<div class='font-bold text-base mb-1'>${f.properties.icon} ${cityName}</div>
						<div class='opacity-80'>${f.properties.venue}</div>
						<div class='mt-1'>${dateStr} — <strong>${f.properties.time}</strong> 🕕</div>
						<div class='mt-2 flex gap-2'>
							<button data-id='${f.properties.id}' class='fly px-2 py-1 rounded bg-[#C1272D] text-white text-xs'>${flyLabel}</button>
							<a target='_blank' rel='noopener' href='https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
								f.properties.venue + " " + cityName
							)}' class='px-2 py-1 rounded border text-xs'>${mapsLabel}</a>
						</div>
					</div>`
				L.marker([lat, lng], { icon }).addTo(map).bindPopup(popupHtml, { maxWidth: 320 })
			})

			const clickHandler = (e: MouseEvent) => {
				const t = e.target as HTMLElement
				const b = t?.closest("button.fly") as HTMLButtonElement | null
				if (!b) return
				const id = b.getAttribute("data-id")
				const f = cities.features.find((x) => x.properties.id === id)
				if (!f) return
				const [lng, lat] = f.geometry.coordinates
				map.flyTo([lat, lng], 13, { animate: true, duration: 1.2 })
			}

			document.addEventListener("click", clickHandler)
			mapRef.current = map
			setTimeout(() => canvasRef.current?.focus?.(), 200)

			cleanup = () => {
				document.removeEventListener("click", clickHandler)
				map.remove()
				mapRef.current = null
			}
		}

		if (!ioRef.current) {
			ioRef.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && canvasRef.current) {
						ensureMap()
						ioRef.current?.disconnect()
						ioRef.current = null
					}
				},
				{ rootMargin: "200px" }
			)
		}

		if (mapRef.current) {
			ensureMap()
		} else {
			ioRef.current.observe(canvasRef.current)
		}

		return () => {
			cleanup?.()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cities, lang])

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			const target = (e.target as HTMLElement)?.closest('[data-action="goto-map"], #buttoncity, .buttoncity') as
				| HTMLElement
				| null
			if (!target) return

			const section = document.getElementById("carte") || document.getElementById("map")
			section?.scrollIntoView({ behavior: "smooth", block: "start" })
			setTimeout(() => canvasRef.current?.focus?.(), 400)

			const cityId = target.getAttribute("data-city")
			if (cityId && mapRef.current) {
				const f = cities.features.find((x) => x.properties.id === cityId)
				if (f) {
					const [lng, lat] = f.geometry.coordinates
					setTimeout(() => mapRef.current?.flyTo([lat, lng], 12, { animate: true, duration: 1 }), 300)
				}
			}
		}

		document.addEventListener("click", handler)
		return () => document.removeEventListener("click", handler)
	}, [cities])

	const flyToCity = (id: string) => {
		const f = cities.features.find((x) => x.properties.id === id)
		if (!f || !mapRef.current) return
		const [lng, lat] = f.geometry.coordinates
		mapRef.current.flyTo([lat, lng], 12, { animate: true, duration: 1 })
	}

	const shareText = lang === "ar" ? "التحقوا بنا — 27–28 شتنبر 2025" : "Rejoignez-nous — 27–28 Septembre 2025"
	const copyLabel = lang === "ar" ? "نسخ الرابط" : "Copier le lien"

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href)
			alert(lang === "ar" ? "تم النسخ!" : "Lien copié !")
		} catch {}
	}

    return (
		<section id="map">
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-3">
					<h3 className="text-xl md:text-2xl font-extrabold">
						{lang === "ar" ? "الخريطة التفاعلية" : "Carte interactive"}
					</h3>
					<span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs bg-[#C1272D] text-white">
						{liveBadgeText}
					</span>
				</div>
                <div className="flex items-center gap-2">
                    <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" href={icsUrl} download="moroccan-youth-voice.ics">
                        📅 {lang === "ar" ? "أضِف إلى التقويم" : "Ajouter au calendrier"}
                    </a>
                </div>
			</div>

			<div className="mb-3 grid grid-cols-4 gap-2 text-center text-xs opacity-80">
				<div className="p-2 rounded-lg border"><div className="text-lg font-extrabold">{d}</div><div>{lang === "ar" ? "يوم" : "Jours"}</div></div>
				<div className="p-2 rounded-lg border"><div className="text-lg font-extrabold">{h}</div><div>{lang === "ar" ? "ساعة" : "Heures"}</div></div>
				<div className="p-2 rounded-lg border"><div className="text-lg font-extrabold">{m}</div><div>{lang === "ar" ? "دقيقة" : "Min"}</div></div>
				<div className="p-2 rounded-lg border"><div className="text-lg font-extrabold">{ss}</div><div>{lang === "ar" ? "ثانية" : "Sec"}</div></div>
			</div>

			<div className="grid md:grid-cols-[1fr_340px] gap-6">
				<div>
					<div
						ref={canvasRef}
						role="application"
						aria-label={lang === "ar" ? "خريطة تفاعلية" : "Carte interactive"}
						tabIndex={-1}
						style={{ width: "100%", height: 520, borderRadius: "1rem", overflow: "hidden" }}
					/>
				</div>
				<aside className="space-y-2" aria-live="polite">
					{cities.features.map((f) => {
						const dateStr = lang === "ar" ? f.properties.date_ar : f.properties.date_fr
						const cityName = lang === "ar" ? f.properties.ar : f.properties.fr
						return (
							<button
								key={f.properties.id}
								className="w-full text-left p-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-[#C1272D] transition"
								onClick={() => flyToCity(f.properties.id)}
								aria-label={`${cityName} — ${f.properties.venue}`}
							>
								<div className="font-semibold">{f.properties.icon} {cityName}</div>
								<div className="text-xs opacity-70">{f.properties.venue} • {dateStr} • {f.properties.time}</div>
							</button>
						)
					})}

					<div className="pt-2 flex flex-wrap gap-2 items-center text-xs opacity-90">
						<span>{lang === "ar" ? "شارك" : "Partager"}</span>
						<a className="px-3 py-1 rounded border" target="_blank" rel="noopener" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}>Twitter/X</a>
						<a className="px-3 py-1 rounded border" target="_blank" rel="noopener" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}>Facebook</a>
						<a className="px-3 py-1 rounded border" target="_blank" rel="noopener" href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + (typeof window !== "undefined" ? window.location.href : ""))}`}>WhatsApp</a>
						<button className="px-3 py-1 rounded border" onClick={copyLink}>{copyLabel}</button>
					</div>
				</aside>
			</div>

			<style>{`
				.pulse{width:18px;height:18px;border-radius:50%;position:relative;background:#C1272D;border:2px solid #fff;box-shadow:0 0 0 rgba(193,39,45,.7)}
				.pulse:after{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(193,39,45,.45);animation:pulse 2s ease-out infinite}
				@keyframes pulse{0%{transform:scale(.8);opacity:1}100%{transform:scale(1.8);opacity:0}}
				@media (prefers-reduced-motion: reduce){.pulse:after{animation-duration:.001ms !important;animation-iteration-count:1 !important}}
			`}</style>
		</section>
	)
}

export default InteractiveMap



