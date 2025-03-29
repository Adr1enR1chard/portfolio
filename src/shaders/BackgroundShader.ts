import { App } from "../classes/App";
import * as THREE from 'three';

export const BackgroundShader = {
    uniforms: {
        renderSize: { value: App.instance.renderSize },
        time: { value: 0.0 },
        bottom_color: { value: new THREE.Color('purple') },
        top_color: { value: new THREE.Color(0x000033) },
        wave_amp: { value: 5.0 },
        wave_size: { value: 1.0 },
        wave_time_mul: { value: 0.1 },
        total_phases: { value: 10 }
    },
    vertexShader: `
        varying vec2 vUv;

        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform vec2 renderSize;
        uniform float time;
        uniform vec3 bottom_color;
        uniform vec3 top_color;
        uniform float wave_amp;
        uniform float wave_size;
        uniform float wave_time_mul;
        uniform int total_phases;

        varying vec2 vUv;

        const float PI = 3.14159265359;
        
        float rand(float n) {
            return fract(sin(n) * 43758.5453123);
        }
        
        float noise(float p) {
            float fl = floor(p);
            float fc = fract(p);
            return mix(rand(fl), rand(fl + 1.0), fc);
        }
        
        float fmod(float x, float y) {
            return x - floor(x / y) * y;
        }
        
        void main() {
            vec2 uv = (gl_FragCoord.xy*vec2(0.5)-0.5) / renderSize.xy;

            float t = float(total_phases);
            float effective_wave_amp = min(wave_amp, 0.5 / t);
            float d = fmod(uv.y, 1.0 / t);
            float i = floor(uv.y * t);
            float vi = floor(uv.y * t + t * effective_wave_amp);
            float s = effective_wave_amp * sin((uv.x + time * max(1.0 / t, noise(vi)) * wave_time_mul * vi / t) * 2.0 * PI * wave_size);
            
            if (d < s) i--;
            if (d > s + 1.0 / t) i++;
            i = clamp(i, 0.0, t - 1.0);
            
            vec3 color = mix(top_color, bottom_color, i / (t - 1.0));
            gl_FragColor = vec4(color, 1.0);
            #include <tonemapping_fragment>
            #include <color_fragment>
        }
    `
};