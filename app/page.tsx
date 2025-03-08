import { Header } from "@/components/header"
import { ProphetTree } from "@/components/prophet-tree"
import { Footer } from "@/components/footer"
import { FloatingNames } from "@/components/floating-names"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingNames />
      <Header />
      <ProphetTree />
      <Footer />
    </main>
  )
}

