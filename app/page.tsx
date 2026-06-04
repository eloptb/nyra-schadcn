"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard, User, CalendarDays, Settings, Shield,
  Sun, Moon, TrendingUp, Users, FileText, Zap,
  Bell, Globe, Lock, ChevronRight, CheckCircle2,
  AlertCircle, Clock, Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

type Page = "dashboard" | "profile" | "planning" | "settings" | "access"

const NAV = [
  { id: "dashboard" as Page, label: "Dashboard",   icon: LayoutDashboard },
  { id: "profile"   as Page, label: "Profil",       icon: User },
  { id: "planning"  as Page, label: "Planning",     icon: CalendarDays },
  { id: "settings"  as Page, label: "Paramètres",   icon: Settings },
  { id: "access"    as Page, label: "Accès",         icon: Shield },
]

/* ─────────────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────────────── */
function DashboardPage() {
  const [target, setTarget] = useState([72])

  const stats = [
    { label: "Utilisateurs actifs", value: "1 284", delta: "+12%", status: "success", icon: Users },
    { label: "Rapports générés",    value: "847",   delta: "+5%",  status: "success", icon: FileText },
    { label: "Appels API",          value: "23.5k", delta: "-2%",  status: "warning", icon: Zap },
    { label: "Uptime",              value: "99.9%", delta: "stable", status: "success", icon: Activity },
  ]

  const activity = [
    { user: "Sophie M.", action: "A généré un rapport Q2", time: "il y a 3 min",  status: "success" },
    { user: "Thomas R.", action: "Erreur API — timeout",   time: "il y a 12 min", status: "error" },
    { user: "Léa D.",    action: "Nouvel accès créé",      time: "il y a 1h",     status: "info" },
    { user: "Marc P.",   action: "Export CSV terminé",     time: "il y a 2h",     status: "success" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Vue d'ensemble de l'activité Genero Enterprise</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardDescription className="text-xs">{s.label}</CardDescription>
              <s.icon size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <Badge
                variant={s.status === "success" ? "default" : s.status === "error" ? "destructive" : "secondary"}
                className="mt-1 text-xs"
              >
                {s.delta}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Activité récente</CardTitle>
            <CardDescription>Dernières actions sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.map((a) => (
              <div key={a.action} className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-full p-1 ${
                  a.status === "success" ? "bg-emerald-100 text-emerald-600" :
                  a.status === "error"   ? "bg-destructive/10 text-destructive" :
                  "bg-accent text-primary"
                }`}>
                  {a.status === "success" ? <CheckCircle2 size={12} /> :
                   a.status === "error"   ? <AlertCircle size={12} /> :
                   <Clock size={12} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{a.user}</p>
                  <p className="text-xs text-muted-foreground">{a.action}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              Voir tout <ChevronRight size={14} className="ml-1" />
            </Button>
          </CardFooter>
        </Card>

        {/* Objectif */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Objectif mensuel</CardTitle>
            <CardDescription>Rapports générés ce mois-ci</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progression</span>
                <span className="font-semibold text-foreground">{target[0]}%</span>
              </div>
              <Slider value={target} onValueChange={setTarget} max={100} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span><span>Objectif : 1 200 rapports</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "En cours",  value: "34",  variant: "default" as const },
                { label: "Terminés",  value: "847", variant: "secondary" as const },
                { label: "En erreur", value: "12",  variant: "destructive" as const },
              ].map((item) => (
                <div key={item.label} className="text-center space-y-1">
                  <Badge variant={item.variant} className="w-full justify-center">{item.value}</Badge>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm" className="flex-1">Voir le rapport</Button>
            <Button size="sm" variant="outline" className="flex-1">Exporter</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   PROFIL
───────────────────────────────────────────────────── */
function ProfilePage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profil</h1>
        <p className="text-sm text-muted-foreground mt-1">Gérez vos informations personnelles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
              EP
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Elodie Petitbon</p>
              <p className="text-xs text-muted-foreground">elodie.petitbon@4js.com</p>
              <Button variant="outline" size="sm">Changer la photo</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prénom</Label>
              <Input defaultValue="Elodie" />
            </div>
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input defaultValue="Petitbon" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" defaultValue="elodie.petitbon@4js.com" />
          </div>

          <div className="space-y-2">
            <Label>Rôle</Label>
            <Select defaultValue="designer">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="developer">Développeur</SelectItem>
                <SelectItem value="pm">Product Manager</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Biographie</Label>
            <Textarea
              defaultValue="Designer UI/UX chez Four Js. En charge du Design System Nyra UI pour les produits Genero."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Équipe</Label>
            <Select defaultValue="product">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Product & Design</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="gap-3">
          <Button className="flex-1">Enregistrer</Button>
          <Button variant="outline" className="flex-1">Annuler</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   PLANNING
───────────────────────────────────────────────────── */
function PlanningPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [density, setDensity] = useState([3])
  const [reminders, setReminders] = useState(true)
  const [weekends, setWeekends] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Planning</h1>
        <p className="text-sm text-muted-foreground mt-1">Gérez votre agenda et vos événements</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Calendrier</CardTitle>
                <ToggleGroup type="single" defaultValue="month" size="sm">
                  <ToggleGroupItem value="week">Semaine</ToggleGroupItem>
                  <ToggleGroupItem value="month">Mois</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Sélectionné :{" "}
                <span className="font-medium text-foreground">
                  {date?.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) ?? "—"}
                </span>
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Affichage</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">Vue par défaut</Label>
                <RadioGroup defaultValue="month">
                  {["Jour", "Semaine", "Mois", "Année"].map((v) => (
                    <div key={v} className="flex items-center gap-2">
                      <RadioGroupItem value={v.toLowerCase()} id={v} />
                      <Label htmlFor={v}>{v}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">Options</Label>
                <div className="flex items-center justify-between">
                  <Label>Afficher les weekends</Label>
                  <Switch checked={weekends} onCheckedChange={setWeekends} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Rappels activés</Label>
                  <Switch checked={reminders} onCheckedChange={setReminders} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Densité des événements</Label>
                  <span className="text-xs text-muted-foreground">{density[0]}/5</span>
                </div>
                <Slider value={density} onValueChange={setDensity} min={1} max={5} step={1} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Filtres rapides</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Réunions", checked: true },
                { label: "Deadlines", checked: true },
                { label: "Formations", checked: false },
                { label: "Congés", checked: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <Checkbox id={item.label} defaultChecked={item.checked} />
                  <Label htmlFor={item.label}>{item.label}</Label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   PARAMÈTRES
───────────────────────────────────────────────────── */
function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
        <p className="text-sm text-muted-foreground mt-1">Personnalisez votre expérience</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-muted-foreground" />
            <CardTitle className="text-base">Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Notifications par email",  desc: "Recevez les mises à jour par email",  checked: true },
            { label: "Alertes de sécurité",       desc: "Connexions et changements de compte", checked: true },
            { label: "Résumé hebdomadaire",        desc: "Bilan chaque lundi matin",           checked: false },
            { label: "Emails marketing",          desc: "Actualités et nouveautés",            checked: false },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <Checkbox id={item.label} defaultChecked={item.checked} className="mt-0.5" />
              <div>
                <Label htmlFor={item.label}>{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Apparence */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-muted-foreground" />
            <CardTitle className="text-base">Apparence</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Thème</Label>
            <ToggleGroup type="single" defaultValue="system" className="justify-start">
              <ToggleGroupItem value="light">☀️ Clair</ToggleGroupItem>
              <ToggleGroupItem value="dark">🌙 Sombre</ToggleGroupItem>
              <ToggleGroupItem value="system">💻 Système</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <Label>Langue</Label>
            <Select defaultValue="fr">
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Densité d'affichage</Label>
            <ToggleGroup type="single" defaultValue="normal" className="justify-start">
              <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
              <ToggleGroupItem value="normal">Normal</ToggleGroupItem>
              <ToggleGroupItem value="spacious">Spacieux</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>

      {/* Fonctionnalités */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-muted-foreground" />
            <CardTitle className="text-base">Fonctionnalités</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Mode bêta",          desc: "Accès aux fonctionnalités en cours de développement", on: false },
            { label: "Sauvegarde auto",    desc: "Sauvegarde automatique toutes les 5 minutes",         on: true },
            { label: "Analytics avancés",  desc: "Statistiques détaillées sur l'utilisation",           on: true },
            { label: "Export automatique", desc: "Export PDF/CSV programmé chaque semaine",             on: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked={item.on} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   ACCÈS
───────────────────────────────────────────────────── */
function AccessPage() {
  const [otpDone, setOtpDone] = useState(false)

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Accès & Sécurité</h1>
        <p className="text-sm text-muted-foreground mt-1">Gérez vos permissions et la sécurité du compte</p>
      </div>

      {/* 2FA */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-muted-foreground" />
            <CardTitle className="text-base">Authentification à deux facteurs</CardTitle>
          </div>
          <CardDescription>Entrez le code reçu par email pour valider</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputOTP maxLength={6} onComplete={() => setOtpDone(true)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {otpDone && (
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2 size={16} />
              Code validé — 2FA activé
            </div>
          )}
        </CardContent>
        <CardFooter className="gap-3">
          <Button disabled={!otpDone}>Activer la 2FA</Button>
          <Button variant="outline">Renvoyer le code</Button>
        </CardFooter>
      </Card>

      {/* Rôle & Permissions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-muted-foreground" />
            <CardTitle className="text-base">Rôle & Permissions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Rôle actuel</Label>
            <Select defaultValue="editor">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer — lecture seule</SelectItem>
                <SelectItem value="editor">Editor — lecture + écriture</SelectItem>
                <SelectItem value="admin">Admin — accès complet</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Permissions actives</Label>
            <div className="flex flex-wrap gap-2">
              {["Lire les rapports", "Créer des exports", "Gérer les utilisateurs", "Accès API", "Tableau de bord"].map((p) => (
                <Badge key={p} variant="secondary">{p}</Badge>
              ))}
              <Badge variant="outline">+ 3 autres</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions */}
      <Card>
        <CardHeader><CardTitle className="text-base">Sessions actives</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { device: "MacBook Pro — Chrome", location: "Paris, FR", current: true,  time: "En cours" },
            { device: "iPhone 15 — Safari",   location: "Paris, FR", current: false, time: "Il y a 2h" },
            { device: "Windows — Firefox",    location: "Lyon, FR",  current: false, time: "Hier" },
          ].map((s) => (
            <div key={s.device} className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{s.device}</p>
                  {s.current && <Badge variant="default" className="text-xs">Actuelle</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{s.location} · {s.time}</p>
              </div>
              {!s.current && (
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  Révoquer
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   LAYOUT PRINCIPAL
───────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("dashboard")
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  const PAGE_TITLES: Record<Page, string> = {
    dashboard: "Dashboard",
    profile: "Profil",
    planning: "Planning",
    settings: "Paramètres",
    access: "Accès",
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">

      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="w-48 shrink-0 flex flex-col border-r border-border bg-sidebar">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <div className="h-6 w-6 rounded bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground text-xs font-bold">G</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground leading-none">Nyra UI</p>
            <p className="text-xs text-sidebar-foreground/50 mt-0.5">Demo App</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                page === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + dark toggle */}
        <div className="border-t border-border px-2 py-3 space-y-0.5">
          <button
            onClick={() => setDark(!dark)}
            className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
            {dark ? "Mode clair" : "Mode sombre"}
          </button>
          <div className="flex items-center gap-2.5 px-2.5 py-1.5">
            <div className="h-6 w-6 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-xs font-semibold shrink-0">
              EP
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">Elodie Petitbon</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">Designer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-11 shrink-0 border-b border-border bg-card flex items-center justify-between px-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Genero Enterprise</span>
            <ChevronRight size={13} />
            <span className="text-foreground font-medium">{PAGE_TITLES[page]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">v1.0.0</Badge>
            <Badge variant="secondary" className="text-xs">Nyra UI</Badge>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {page === "dashboard" && <DashboardPage />}
          {page === "profile"   && <ProfilePage />}
          {page === "planning"  && <PlanningPage />}
          {page === "settings"  && <SettingsPage />}
          {page === "access"    && <AccessPage />}
        </main>
      </div>
    </div>
  )
}
