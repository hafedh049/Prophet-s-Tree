"use client"

import { X } from "lucide-react"
import type { Prophet } from "@/lib/data"
import { Button } from "@/components/ui/button"

interface ProphetDetailsProps {
  prophet: Prophet
  onClose: () => void
}

export function ProphetDetails({ prophet, onClose }: ProphetDetailsProps) {
  const renderFamilyMembers = () => {
    const family = prophet.family
    const sections = []

    if (family.father) {
      sections.push(
        <div key="father" className="mb-2">
          <span className="font-bold ml-2">الأب:</span> {family.father}
        </div>,
      )
    }

    if (family.mother) {
      sections.push(
        <div key="mother" className="mb-2">
          <span className="font-bold ml-2">الأم:</span> {family.mother}
        </div>,
      )
    }

    if (family.wives && family.wives.length > 0) {
      sections.push(
        <div key="wives" className="mb-2">
          <span className="font-bold ml-2">الزوجات:</span>
          <ul className="list-disc list-inside mr-4 mt-1">
            {family.wives.map((wife, index) => (
              <li key={index}>{wife}</li>
            ))}
          </ul>
        </div>,
      )
    }

    if (family.children && family.children.length > 0) {
      sections.push(
        <div key="children" className="mb-2">
          <span className="font-bold ml-2">الأبناء:</span>
          <ul className="list-disc list-inside mr-4 mt-1">
            {family.children.map((child, index) => (
              <li key={index}>{child}</li>
            ))}
          </ul>
        </div>,
      )
    }

    if (family.siblings && family.siblings.length > 0) {
      sections.push(
        <div key="siblings" className="mb-2">
          <span className="font-bold ml-2">الإخوة:</span>
          <ul className="list-disc list-inside mr-4 mt-1">
            {family.siblings.map((sibling, index) => (
              <li key={index}>{sibling}</li>
            ))}
          </ul>
        </div>,
      )
    }

    if (family.other) {
      sections.push(
        <div key="other" className="mb-2">
          <span className="font-bold ml-2">معلومات أخرى:</span> {family.other}
        </div>,
      )
    }

    return sections
  }

  return (
    <div className="prophet-details text-right">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold ml-2 arabic-text">{prophet.nameArabic}</h2>
          <span className="text-lg text-muted-foreground">({prophet.nameEnglish})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-primary">الوصف</h3>
            <p className="text-lg">{prophet.description}</p>
          </div>

          {prophet.age > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-primary">العمر</h3>
              <p className="text-lg">{prophet.age} سنة</p>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-primary">المعجزات</h3>
            <ul className="list-disc list-inside mr-4">
              {prophet.miracles.map((miracle, index) => (
                <li key={index} className="mb-1">
                  {miracle}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-primary">العائلة</h3>
          <div className="bg-black/30 p-4 rounded-lg">{renderFamilyMembers()}</div>
        </div>
      </div>
    </div>
  )
}

