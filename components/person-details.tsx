"use client"

import { X } from "lucide-react"
import type { Person } from "@/lib/data"
import { Button } from "@/components/ui/button"

interface PersonDetailsProps {
  person: Person
  onClose: () => void
}

export function PersonDetails({ person, onClose }: PersonDetailsProps) {
  const renderFamilyMembers = () => {
    if (!person.family) return null

    const family = person.family
    const sections = []

    if (family.father) {
      sections.push(
        <div key="father" className="mb-3">
          <span className="font-bold ml-2 text-primary">الأب:</span> {family.father}
        </div>,
      )
    }

    if (family.mother) {
      sections.push(
        <div key="mother" className="mb-3">
          <span className="font-bold ml-2 text-primary">الأم:</span> {family.mother}
        </div>,
      )
    }

    if (family.wives && family.wives.length > 0) {
      sections.push(
        <div key="wives" className="mb-3">
          <span className="font-bold ml-2 text-primary">الزوجات:</span>
          <ul className="list-disc list-inside mr-6 mt-1 space-y-1">
            {family.wives.map((wife, index) => (
              <li key={index}>{wife}</li>
            ))}
          </ul>
        </div>,
      )
    }

    if (family.children && family.children.length > 0) {
      sections.push(
        <div key="children" className="mb-3">
          <span className="font-bold ml-2 text-primary">الأبناء:</span>
          <ul className="list-disc list-inside mr-6 mt-1 space-y-1">
            {family.children.map((child, index) => (
              <li key={index}>{child}</li>
            ))}
          </ul>
        </div>,
      )
    }

    if (family.siblings && family.siblings.length > 0) {
      sections.push(
        <div key="siblings" className="mb-3">
          <span className="font-bold ml-2 text-primary">الإخوة:</span>
          <ul className="list-disc list-inside mr-6 mt-1 space-y-1">
            {family.siblings.map((sibling, index) => (
              <li key={index}>{sibling}</li>
            ))}
          </ul>
        </div>,
      )
    }

    if (family.other) {
      sections.push(
        <div key="other" className="mb-3">
          <span className="font-bold ml-2 text-primary">معلومات أخرى:</span> {family.other}
        </div>,
      )
    }

    return sections
  }

  return (
    <div className="person-details text-right">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold ml-2 arabic-text">{person.nameArabic}</h2>
          <span className="text-lg text-muted-foreground">({person.nameEnglish})</span>
          {person.isProphet && (
            <span className="mr-2 px-2 py-0.5 bg-green-800/50 text-green-300 text-xs rounded-full">نبي</span>
          )}
          {person.relation && (
            <span className="mr-2 px-2 py-0.5 bg-purple-800/50 text-purple-300 text-xs rounded-full">
              {person.relation}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {person.description && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-primary">الوصف</h3>
              <p className="text-lg">{person.description}</p>
            </div>
          )}

          {person.age && person.age > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-primary">العمر</h3>
              <p className="text-lg">{person.age} سنة</p>
            </div>
          )}

          {person.isProphet && person.miracles && person.miracles.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-primary">المعجزات</h3>
              <ul className="list-disc list-inside mr-4 space-y-1">
                {person.miracles.map((miracle, index) => (
                  <li key={index} className="mb-1">
                    {miracle}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          {person.family && (
            <>
              <h3 className="text-xl font-semibold mb-2 text-primary">العائلة</h3>
              <div className="bg-black/30 p-4 rounded-lg">{renderFamilyMembers()}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

