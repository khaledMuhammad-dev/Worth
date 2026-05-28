'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AdminHeader from '@/components/admin/AdminHeader'
import ImageField from '@/components/admin/ImageField'
import LocaleField from '@/components/admin/LocaleField'
import initialData from '@/content/data/about.json'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface AboutData {
  hero: { headingEN: string; headingAR: string; accentWordEN: string; accentWordAR: string; subheadingEN: string; subheadingAR: string }
  story: { headingEN: string; headingAR: string; bodyEN: string; bodyAR: string }
  values: { id: string; icon: string; titleEN: string; titleAR: string; descriptionEN: string; descriptionAR: string }[]
  team: { id: string; name: string; roleEN: string; roleAR: string; photoUrl: string; bioEN: string; bioAR: string }[]
  milestones: { year: string; titleEN: string; titleAR: string; descriptionEN: string; descriptionAR: string }[]
  clients: { id: string; name: string; logoUrl: string }[]
}

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData>(() => JSON.parse(JSON.stringify(initialData)))
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/save/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
  }

  return (
    <div>
      <AdminHeader title={t('admin.about.title')} subtitle={t('admin.about.subtitle')} onSave={save} saving={saving} />
      <div className="p-6">
        <Tabs defaultValue="story">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="story">{t('admin.about.tabStory')}</TabsTrigger>
            <TabsTrigger value="values">{t('admin.about.tabValues')}</TabsTrigger>
            <TabsTrigger value="team">{t('admin.about.tabTeam')}</TabsTrigger>
            <TabsTrigger value="milestones">{t('admin.about.tabMilestones')}</TabsTrigger>
            <TabsTrigger value="clients">{t('admin.about.tabClients')}</TabsTrigger>
          </TabsList>

          <TabsContent value="story" className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
            <LocaleField labelEN="Hero Heading" labelAR="عنوان الهيرو" valueEN={data.hero.headingEN} valueAR={data.hero.headingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, headingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, headingAR: value } })} />
            <LocaleField labelEN="Hero Accent" labelAR="الكلمة المميزة للهيرو" valueEN={data.hero.accentWordEN} valueAR={data.hero.accentWordAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, accentWordEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, accentWordAR: value } })} />
            <LocaleField multiline labelEN="Hero Subheading" labelAR="العنوان الفرعي للهيرو" valueEN={data.hero.subheadingEN} valueAR={data.hero.subheadingAR} onChangeEN={(value) => setData({ ...data, hero: { ...data.hero, subheadingEN: value } })} onChangeAR={(value) => setData({ ...data, hero: { ...data.hero, subheadingAR: value } })} />
            <LocaleField labelEN="Story Heading" labelAR="عنوان القصة" valueEN={data.story.headingEN} valueAR={data.story.headingAR} onChangeEN={(value) => setData({ ...data, story: { ...data.story, headingEN: value } })} onChangeAR={(value) => setData({ ...data, story: { ...data.story, headingAR: value } })} />
            <LocaleField multiline labelEN="Story Body" labelAR="نص القصة" valueEN={data.story.bodyEN} valueAR={data.story.bodyAR} onChangeEN={(value) => setData({ ...data, story: { ...data.story, bodyEN: value } })} onChangeAR={(value) => setData({ ...data, story: { ...data.story, bodyAR: value } })} />
          </TabsContent>

          <TabsContent value="values" className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
            {data.values.map((value, index) => (
              <div key={value.id} className="space-y-3 rounded-xl border border-gray-100 p-4">
                <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={value.icon} onChange={(event) => setData({ ...data, values: data.values.map((entry, itemIndex) => itemIndex === index ? { ...entry, icon: event.target.value } : entry) })} placeholder={t('admin.about.iconKey')} />
                <LocaleField labelEN="Title" labelAR="العنوان" valueEN={value.titleEN} valueAR={value.titleAR} onChangeEN={(text) => setData({ ...data, values: data.values.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleEN: text } : entry) })} onChangeAR={(text) => setData({ ...data, values: data.values.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleAR: text } : entry) })} />
                <LocaleField multiline labelEN="Description" labelAR="الوصف" valueEN={value.descriptionEN} valueAR={value.descriptionAR} onChangeEN={(text) => setData({ ...data, values: data.values.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionEN: text } : entry) })} onChangeAR={(text) => setData({ ...data, values: data.values.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionAR: text } : entry) })} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="team" className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
            {data.team.map((member, index) => (
              <div key={member.id} className="space-y-3 rounded-xl border border-gray-100 p-4">
                <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={member.name} onChange={(event) => setData({ ...data, team: data.team.map((entry, itemIndex) => itemIndex === index ? { ...entry, name: event.target.value } : entry) })} placeholder={t('admin.about.memberName')} />
                <LocaleField labelEN="Role" labelAR="الدور" valueEN={member.roleEN} valueAR={member.roleAR} onChangeEN={(text) => setData({ ...data, team: data.team.map((entry, itemIndex) => itemIndex === index ? { ...entry, roleEN: text } : entry) })} onChangeAR={(text) => setData({ ...data, team: data.team.map((entry, itemIndex) => itemIndex === index ? { ...entry, roleAR: text } : entry) })} />
                <LocaleField multiline labelEN="Bio" labelAR="السيرة الذاتية" valueEN={member.bioEN} valueAR={member.bioAR} onChangeEN={(text) => setData({ ...data, team: data.team.map((entry, itemIndex) => itemIndex === index ? { ...entry, bioEN: text } : entry) })} onChangeAR={(text) => setData({ ...data, team: data.team.map((entry, itemIndex) => itemIndex === index ? { ...entry, bioAR: text } : entry) })} />
                <ImageField label={t('admin.about.photoUrl')} value={member.photoUrl} onChange={(value) => setData({ ...data, team: data.team.map((entry, itemIndex) => itemIndex === index ? { ...entry, photoUrl: value } : entry) })} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
            {data.milestones.map((milestone, index) => (
              <div key={milestone.year} className="space-y-3 rounded-xl border border-gray-100 p-4">
                <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={milestone.year} onChange={(event) => setData({ ...data, milestones: data.milestones.map((entry, itemIndex) => itemIndex === index ? { ...entry, year: event.target.value } : entry) })} placeholder={t('admin.about.milestoneYear')} />
                <LocaleField labelEN="Title" labelAR="العنوان" valueEN={milestone.titleEN} valueAR={milestone.titleAR} onChangeEN={(text) => setData({ ...data, milestones: data.milestones.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleEN: text } : entry) })} onChangeAR={(text) => setData({ ...data, milestones: data.milestones.map((entry, itemIndex) => itemIndex === index ? { ...entry, titleAR: text } : entry) })} />
                <LocaleField multiline labelEN="Description" labelAR="الوصف" valueEN={milestone.descriptionEN} valueAR={milestone.descriptionAR} onChangeEN={(text) => setData({ ...data, milestones: data.milestones.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionEN: text } : entry) })} onChangeAR={(text) => setData({ ...data, milestones: data.milestones.map((entry, itemIndex) => itemIndex === index ? { ...entry, descriptionAR: text } : entry) })} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="clients" className="space-y-4 rounded-xl border dark:border-sop-border dark:bg-sop-surface bg-white p-6">
            {data.clients.map((client, index) => (
              <div key={client.id} className="space-y-3 rounded-xl border border-gray-100 p-4">
                <input className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" value={client.name} onChange={(event) => setData({ ...data, clients: data.clients.map((entry, itemIndex) => itemIndex === index ? { ...entry, name: event.target.value } : entry) })} placeholder={t('admin.about.clientName')} />
                <ImageField label={t('admin.about.logoUrl')} value={client.logoUrl} onChange={(value) => setData({ ...data, clients: data.clients.map((entry, itemIndex) => itemIndex === index ? { ...entry, logoUrl: value } : entry) })} />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
