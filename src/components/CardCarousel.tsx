interface CardCarouselProps {
    children: React.ReactNode;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ children }) => {
    return (
        <div className="flex flex-row gap-4 overflow-auto p-1">{children}</div>
    );
};

export default CardCarousel;
