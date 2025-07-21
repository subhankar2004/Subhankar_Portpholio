export const TechIcon = ({ component }: { component: React.ElementType }) => {
    const Component = component;
    return (
        <>
            <Component className="size-10 fill-[url(#tech-icon-gradient)]" />
            <svg className="size-0 absolute">
                <defs>
                    {/* Multi-stop gradient with more detail */}
                    <linearGradient id="tech-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop stopColor="rgb(34 197 94)" offset="0%" />      {/* Green-500 */}
                        <stop stopColor="rgb(59 130 246)" offset="25%" />    {/* Blue-500 */}
                        <stop stopColor="rgb(147 51 234)" offset="50%" />    {/* Purple-600 */}
                        <stop stopColor="rgb(236 72 153)" offset="75%" />    {/* Pink-500 */}
                        <stop stopColor="rgb(249 115 22)" offset="100%" />   {/* Orange-500 */}
                    </linearGradient>
                    
                    {/* Alternative: Radial gradient for more depth */}
                    <radialGradient id="tech-icon-radial" cx="50%" cy="50%" r="50%">
                        <stop stopColor="rgb(110 231 183)" offset="0%" />
                        <stop stopColor="rgb(34 197 94)" offset="40%" />
                        <stop stopColor="rgb(59 130 246)" offset="70%" />
                        <stop stopColor="rgb(147 51 234)" offset="100%" />
                    </radialGradient>
                    
                    {/* Animated gradient (optional) */}
                    <linearGradient id="tech-icon-animated" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop stopColor="rgb(34 197 94)" offset="0%">
                            <animate attributeName="stop-color" 
                                values="rgb(34 197 94);rgb(59 130 246);rgb(147 51 234);rgb(34 197 94)" 
                                dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop stopColor="rgb(147 51 234)" offset="50%">
                            <animate attributeName="stop-color" 
                                values="rgb(147 51 234);rgb(236 72 153);rgb(249 115 22);rgb(147 51 234)" 
                                dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop stopColor="rgb(59 130 246)" offset="100%">
                            <animate attributeName="stop-color" 
                                values="rgb(59 130 246);rgb(34 197 94);rgb(147 51 234);rgb(59 130 246)" 
                                dur="3s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                </defs>
            </svg>
        </>
    )
}