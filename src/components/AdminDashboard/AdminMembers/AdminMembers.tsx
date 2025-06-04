// src/components/AdminMembers.tsx
import React, { useEffect, useState, useRef } from "react";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { Member } from "@/interfaces/IMember";
import { Divider } from "@heroui/react";
import CreateMember from "./CreateMember";
import EditMemberDialog from "./EditMemberDialog";
import api from "@/api";
import MemberCard from "@/components/MemberCard";

const AdminMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchMembers = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleLoding = () => {
    fetchMembers();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }

  useEffect(() => {
    handleLoding();
  }, []);

  if (isCreating) {
    return (
      <CreateMember
        onCancel={() => setIsCreating(false)}
        onCreated={() => {
          setIsCreating(false);
          handleLoding();
        }}
      />
    );
  }

  const handleCardClick = (member: Member) => {
    setMemberToEdit(member);
    setEditOpen(true);
  };

  const handleDeleteClick = async (member: Member) => {
    const ok = window.confirm("Silme işlemine devam etmek istiyor musunuz?");
    if (!ok) return;
    try {
      await api.delete(`/members/${member._id}`);
      fetchMembers();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Üye silinirken bir hata oluştu.");
    }
  };

  return (
    <section ref={sectionRef} className="container mx-auto px-4 mt-6">

      <div className="flex justify-end mb-4">
        <Button color="primary" onPress={() => setIsCreating(true)}>
          Üye Ekle
        </Button>
      </div>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 justify-items-center">
        {members.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 50 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <MemberCard
              member={member}
              isEditable={true}
              onEditMode={() => handleCardClick(member)}
              onDeleteMode={() => handleDeleteClick(member)}
            />
          </motion.div>
        ))}
      </div>

      <EditMemberDialog
        open={editOpen}
        member={memberToEdit}
        onClose={() => setEditOpen(false)}
        onMemberUpdated={() => {
          fetchMembers();
          setEditOpen(false);
        }}
      />
    </section>

  );
};

export default AdminMembers;
