"use client";

import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GripVertical, Plus, Trash2 } from "lucide-react";
import { BLOCK_ORDER, createSection, BLOCK_LABELS } from "@/lib/block-factory";
import { PRDDocument, Section } from "@/types/prd";
import { BlockEditor } from "./block-editors";
import { Field, TextInput } from "./form-primitives";


export function SectionListEditor({
  doc,
  onChange,
}: Readonly<{
  doc: PRDDocument;
  onChange: (doc: PRDDocument) => void;
}>) {
  const [openId, setOpenId] = useState<string | null>(doc.sections[0]?.id ?? null);
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  const setSections = (sections: Section[]) => onChange({ ...doc, sections });

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const next = Array.from(doc.sections);
    const [moved] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, moved);
    setSections(next);
  }

  function addSection(type: (typeof BLOCK_ORDER)[number]) {
    const nextNumber = String(doc.sections.length + 1).padStart(2, "0");
    const section = createSection(type, nextNumber);
    setSections([...doc.sections, section]);
    setOpenId(section.id);
    setAddMenuOpen(false);
  }

  function removeSection(id: string) {
    setSections(doc.sections.filter((s) => s.id !== id));
  }

  function updateSection(id: string, patch: Partial<Section>) {
    setSections(doc.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  return (
    <div className="flex flex-col gap-3">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2">
              {doc.sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(dragProvided, snapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className={
                        "rounded-xl border bg-white transition-shadow " +
                        (snapshot.isDragging ? "border-neutral-300 shadow-lg" : "border-neutral-200")
                      }
                    >
                      <div className="flex items-center gap-2 px-3 py-2.5">
                        <span
                          {...dragProvided.dragHandleProps}
                          className="cursor-grab text-neutral-300 hover:text-neutral-500 active:cursor-grabbing"
                        >
                          <GripVertical size={15} />
                        </span>
                        <button
                          type="button"
                          onClick={() => setOpenId(openId === section.id ? null : section.id)}
                          className="flex flex-1 items-center gap-2 text-left"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neutral-100 text-[10px] font-bold text-neutral-500">
                            {section.number}
                          </span>
                          <span className="truncate text-sm font-medium text-neutral-800">
                            {section.title || "Untitled section"}
                          </span>
                          <span className="ml-auto shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-400">
                            {BLOCK_LABELS[section.block.type]}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setOpenId(openId === section.id ? null : section.id)}
                          className="text-neutral-400"
                        >
                          <motion.span
                            animate={{ rotate: openId === section.id ? 180 : 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex"
                          >
                            <ChevronDown size={15} />
                          </motion.span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSection(section.id)}
                          title="Delete section"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-300 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {openId === section.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 border-t border-neutral-100 px-3 pb-3.5 pt-3.5">
                              <div className="flex gap-2">
                                <Field label="Number">
                                  <TextInput
                                    value={section.number}
                                    onChange={(e) => updateSection(section.id, { number: e.target.value })}
                                    className="w-16"
                                  />
                                </Field>
                                <div className="flex-1">
                                  <Field label="Title">
                                    <TextInput
                                      value={section.title}
                                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                    />
                                  </Field>
                                </div>
                              </div>
                              <Field label="Eyebrow label">
                                <TextInput
                                  value={section.eyebrow}
                                  onChange={(e) => updateSection(section.id, { eyebrow: e.target.value })}
                                />
                              </Field>

                              <div className="border-t border-neutral-100 pt-3">
                                <BlockEditor
                                  block={section.block}
                                  onChange={(block) => updateSection(section.id, { block })}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="relative">
        <button
          type="button"
          onClick={() => setAddMenuOpen((v) => !v)}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-300 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-700"
        >
          <Plus size={15} />
          Add section
        </button>

        <AnimatePresence>
          {addMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.14 }}
              className="absolute left-0 right-0 top-full z-20 mt-1.5 grid grid-cols-2 gap-1 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg"
            >
              {BLOCK_ORDER.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => addSection(type)}
                  className="rounded-lg px-2.5 py-2 text-left text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
                >
                  {BLOCK_LABELS[type]}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}