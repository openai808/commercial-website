"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type {
  LeadershipImageTransform,
  LeadershipMember,
} from "@/lib/people/leadershipTeam";

export default function AgentCard({ member }: { member: LeadershipMember }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleCancel(e: Event) {
      e.preventDefault();
      setOpen(false);
    }

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      setOpen(false);
    }
  }

  const titleId = `agent-modal-title-${member.id}`;

  return (
    <li
      className={`rounded-[14px] bg-white px-[18px] pt-[18px] pb-[26px] text-center shadow-[0_6px_22px_rgba(0,0,0,0.10)] ${
        member.offset ? "min-[1101px]:col-start-2" : ""
      }`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-[#C3CDD1]">
        <Image
          src={`/images/agents/${member.id}.png`}
          alt={member.name}
          fill
          className="object-cover object-top"
          style={getImageTransformStyle(member.imageTransform)}
          sizes="(min-width: 1101px) 20vw, (min-width: 621px) 33vw, 50vw"
        />
      </div>
      <h3 className="mt-[18px] inline-block border-b-2 border-[#EE1C25] pb-[6px] text-[15px] font-bold uppercase tracking-[0.02em] text-[#0B1B45]">
        {member.name}
      </h3>
      <p className="mt-[12px] text-[12px] text-[#333]">{member.role}</p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer mt-[26px] inline-block rounded-[6px] bg-[#123B72] px-[24px] py-[10px] text-[14px] font-medium tracking-[0.04em] text-white transition-colors hover:bg-[#0d2c58]"
      >
        Read More <span className="ml-1 opacity-75">»</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={handleBackdropClick}
        className="m-0 mx-auto my-auto w-full max-w-3xl rounded-none border-0 bg-transparent p-0 open:flex open:items-center open:justify-center opacity-0 scale-95 transition-all transition-discrete duration-300 ease-out open:opacity-100 open:scale-100 starting:open:opacity-0 starting:open:scale-95 backdrop:bg-[#0B1B45]/70 backdrop:backdrop-blur-sm"
      >
        <div
          className="relative max-h-[90vh] w-full overflow-hidden bg-white shadow-[0_28px_40px_rgba(0,0,0,0.10)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close agent details"
            className="cursor-pointer absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0B1B45]/60 shadow-[0_5px_10px_rgba(0,0,0,0.10)] transition-colors hover:text-[#0B1B45] md:right-4 md:top-4"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="max-h-[90vh] overflow-y-auto p-6 text-left sm:flex sm:items-start sm:gap-8 sm:p-10">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#C3CDD1] shadow-[0_15px_25px_rgba(0,0,0,0.12)] sm:w-1/3 sm:shrink-0">
              <Image
                src={`/images/agents/${member.id}.png`}
                alt={member.name}
                fill
                className="object-cover object-top"
                style={getImageTransformStyle(member.imageTransform)}
                sizes="(min-width: 640px) 33vw, 90vw"
              />
            </div>

            <div className="mt-6 min-w-0 flex-1 sm:mt-0">
              <h2 id={titleId} className="text-[22px] font-bold text-[#0B1B45]">
                {member.name}
              </h2>
              <p className="mb-8 mt-1 text-[13px] text-[#333]/70">
                {member.role}
              </p>

              {member.details ? (
                <>
                  <p className="text-sm leading-relaxed text-[#333]">
                    {member.details.bio}
                  </p>

                  <ul className="mt-6 divide-y divide-[#0B1B45]/10 border-y border-[#0B1B45]/10 text-[14px] text-[#333]">
                    <li className="flex flex-wrap items-baseline gap-x-3 py-4">
                      <span className="font-semibold text-[#0B1B45]">
                        License
                      </span>
                      <span>{member.details.license}</span>
                    </li>
                    <li className="flex flex-wrap items-baseline gap-x-3 py-4">
                      <span className="font-semibold text-[#0B1B45]">
                        Phone
                      </span>
                      <a
                        href={`tel:${member.details.phone.replace(/\s/g, "")}`}
                        className="transition-colors hover:text-[#EE1C25]"
                      >
                        {member.details.phone}
                      </a>
                    </li>
                    <li className="flex flex-wrap items-baseline gap-x-3 py-4">
                      <span className="font-semibold text-[#0B1B45]">
                        Email
                      </span>
                      <a
                        href={`mailto:${member.details.email}`}
                        className="transition-colors hover:text-[#EE1C25]"
                      >
                        {member.details.email}
                      </a>
                    </li>
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </dialog>
    </li>
  );
}

function getImageTransformStyle(
  transform: LeadershipImageTransform | undefined,
): CSSProperties | undefined {
  if (!transform) return undefined;

  const { translateX = 0, translateY = 0, rotate = 0, scale = 1 } = transform;

  return {
    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
    scale,
  };
}
