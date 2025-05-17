"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MoreVertical, Copy, Edit, BarChart3, Trash2, Link2, Plus, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function BookingLinksList() {
  const router = useRouter()
  const [bookingLinks, setBookingLinks] = useState<
    Array<{
      id: string
      name: string
      link: string
      views: number
      createdAt: string
    }>
  >([])

  // State for copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Refs for dropdown positioning
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  useEffect(() => {
    // Load booking links from localStorage
    const savedLinks = localStorage.getItem("bookingLinks")
    if (savedLinks) {
      try {
        const parsedLinks = JSON.parse(savedLinks)
        if (Array.isArray(parsedLinks)) {
          setBookingLinks(parsedLinks)
        }
      } catch (error) {
        console.error("Error parsing booking links from localStorage:", error)
      }
    }
  }, [])

  // State to track which dropdown is open
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  // State to track dropdown position
  const [dropdownPositions, setDropdownPositions] = useState<{ [key: string]: "top" | "bottom" }>({})

  // Toggle dropdown
  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the row click from triggering

    // If opening a dropdown, calculate its position
    if (openDropdownId !== id) {
      const buttonElement = buttonRefs.current[id]
      if (buttonElement) {
        const rect = buttonElement.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const spaceBelow = windowHeight - rect.bottom

        // If there's not enough space below (less than 200px), position above
        setDropdownPositions((prev) => ({
          ...prev,
          [id]: spaceBelow < 200 ? "top" : "bottom",
        }))
      }
    }

    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  // Copy link to clipboard
  const copyLink = (link: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(link)

    // Show copy feedback
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Delete link
  const deleteLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    // Create a custom confirmation dialog
    if (confirm("Are you sure you want to delete this booking link?")) {
      // Remove from state
      const updatedLinks = bookingLinks.filter((link) => link.id !== id)
      setBookingLinks(updatedLinks)

      // Remove from localStorage
      localStorage.setItem("bookingLinks", JSON.stringify(updatedLinks))
    }

    setOpenDropdownId(null)
  }

  // Handle row click to navigate to edit page
  const handleRowClick = (id: string) => {
    router.push(`/booking-links/edit/${id}`)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId !== null) {
        const buttonElement = buttonRefs.current[openDropdownId]
        const dropdownElement = dropdownRefs.current[openDropdownId]

        if (
          buttonElement &&
          dropdownElement &&
          !buttonElement.contains(event.target as Node) &&
          !dropdownElement.contains(event.target as Node)
        ) {
          setOpenDropdownId(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdownId])

  return (
    <>
      {bookingLinks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-[#2A2A2A] p-4 mb-4">
            <Link2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No booking links yet</h3>
          <p className="text-gray-400 max-w-md mb-6">
            Create your first booking link to allow others to schedule meetings with you.
          </p>
          <Link
            href="/booking-links/create"
            className="flex items-center gap-2 rounded-md bg-[#7747FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#8A5CFF]"
          >
            <Plus className="h-4 w-4" />
            Create New Link
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#2A2A2A]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-400">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-400">Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-400">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-400">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {bookingLinks.map((link) => (
                <tr
                  key={link.id}
                  className="cursor-pointer hover:bg-[#1A1A1A] transition-colors"
                  onClick={() => handleRowClick(link.id)}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">{link.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    <Link
                      href={`/booking/${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-blue-500 hover:underline"
                      onClick={(e) => e.stopPropagation()} // Prevent row click
                    >
                      {link.link}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">{link.views}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">{link.createdAt}</td>
                  <td className="relative whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex w-8 h-8 justify-center items-center rounded-full text-gray-400 hover:text-white hover:bg-[#3A3A3A] focus:outline-none transition-colors"
                        id={`menu-button-${link.id}`}
                        aria-expanded={openDropdownId === link.id}
                        aria-haspopup="true"
                        onClick={(e) => toggleDropdown(link.id, e)}
                        ref={(el) => (buttonRefs.current[link.id] = el)}
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>

                      {openDropdownId === link.id && (
                        <div
                          className={`fixed z-50 w-48 rounded-md bg-[#2A2A2A] border border-[#3A3A3A] shadow-lg shadow-black/30 focus:outline-none animate-in fade-in zoom-in-95 duration-100`}
                          style={{
                            top:
                              dropdownPositions[link.id] === "top"
                                ? "auto"
                                : buttonRefs.current[link.id]?.getBoundingClientRect().bottom + window.scrollY + "px",
                            bottom:
                              dropdownPositions[link.id] === "top"
                                ? window.innerHeight -
                                  (buttonRefs.current[link.id]?.getBoundingClientRect().top || 0) +
                                  window.scrollY +
                                  "px"
                                : "auto",
                            left:
                              buttonRefs.current[link.id]?.getBoundingClientRect().left + window.scrollX - 120 + "px", // Offset to align better
                          }}
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby={`menu-button-${link.id}`}
                          onClick={(e) => e.stopPropagation()} // Prevent row click
                          ref={(el) => (dropdownRefs.current[link.id] = el)}
                        >
                          <div className="py-1" role="none">
                            <button
                              className="group flex w-full items-center px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#3A3A3A] hover:text-white transition-colors"
                              role="menuitem"
                              onClick={(e) => copyLink(link.link, link.id, e)}
                            >
                              {copiedId === link.id ? (
                                <>
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 mr-2 group-hover:text-white" />
                                  <span>Copy Link</span>
                                </>
                              )}
                            </button>
                            <Link
                              href={`/booking-links/edit/${link.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#3A3A3A] hover:text-white transition-colors"
                              role="menuitem"
                              onClick={(e) => {
                                e.stopPropagation() // Prevent row click
                                setOpenDropdownId(null)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              <span>Edit</span>
                            </Link>
                            <Link
                              href={`/booking-links/analytics/${link.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#3A3A3A] hover:text-white transition-colors"
                              role="menuitem"
                              onClick={(e) => {
                                e.stopPropagation() // Prevent row click
                                setOpenDropdownId(null)
                              }}
                            >
                              <BarChart3 className="h-4 w-4 mr-2" />
                              <span>Analytics</span>
                            </Link>
                            <button
                              className="flex w-full items-center px-4 py-2 text-left text-sm text-red-400 hover:bg-[#3A3A3A] hover:text-red-300 transition-colors"
                              role="menuitem"
                              onClick={(e) => deleteLink(link.id, e)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
