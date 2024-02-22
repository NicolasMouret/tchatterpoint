import { db } from '@/db';
import paths from '@/paths';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map(topic => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          <Chip 
            className="hover:scale-[1.04]" 
            color="warning" 
            variant="shadow">
              {topic.name}
          </Chip> 
        </Link>
      </div>
    )
  });

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {renderedTopics}
    </div>
  )
}