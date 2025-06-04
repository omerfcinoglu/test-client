// src/pages/HomeContent/Members.tsx
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import {
  useDisclosure,
  Image,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Divider
} from "@heroui/react";
import { motion } from "framer-motion";
import api from "@/api";
import MemberCard from "@/components/MemberCard";

interface Member {
  _id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

const Members: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const fetchMembers = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Members yüklenirken hata:", error);
    }
  };

  useEffect(() => {
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
  }, []);

  const handleCardClick = (member: Member) => {
    setSelectedMember(member);
    onOpen();
  };

  return (
    <section ref={sectionRef} className="container mx-auto px-4 mt-6">
      <Divider />
      <h2 className="text-3xl font-bold text-center mt-4">Ekibimiz</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 justify-items-center">
        {members.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 50 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <MemberCard member={member} isEditable={false} onSeeDetails={() => handleCardClick(member)} />
          </motion.div>
        ))}
      </div>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {selectedMember?.name}
              </DrawerHeader>
              <DrawerBody>
                <Image
                  src={selectedMember?.image}
                  className="w-24 h-24 rounded-full justify-center items-center mb-4"
                />
                <p>{selectedMember?.description}</p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Kapat
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default Members;
