
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #f6bb16
		"--color-primary-50": "254 245 220", // #fef5dc
		"--color-primary-100": "253 241 208", // #fdf1d0
		"--color-primary-200": "253 238 197", // #fdeec5
		"--color-primary-300": "251 228 162", // #fbe4a2
		"--color-primary-400": "249 207 92", // #f9cf5c
		"--color-primary-500": "246 187 22", // #f6bb16
		"--color-primary-600": "221 168 20", // #dda814
		"--color-primary-700": "185 140 17", // #b98c11
		"--color-primary-800": "148 112 13", // #94700d
		"--color-primary-900": "121 92 11", // #795c0b
		// secondary | #4d09fd
		"--color-secondary-50": "228 218 255", // #e4daff
		"--color-secondary-100": "219 206 255", // #dbceff
		"--color-secondary-200": "211 194 255", // #d3c2ff
		"--color-secondary-300": "184 157 254", // #b89dfe
		"--color-secondary-400": "130 83 254", // #8253fe
		"--color-secondary-500": "77 9 253", // #4d09fd
		"--color-secondary-600": "69 8 228", // #4508e4
		"--color-secondary-700": "58 7 190", // #3a07be
		"--color-secondary-800": "46 5 152", // #2e0598
		"--color-secondary-900": "38 4 124", // #26047c
		// tertiary | #39b41a
		"--color-tertiary-50": "225 244 221", // #e1f4dd
		"--color-tertiary-100": "215 240 209", // #d7f0d1
		"--color-tertiary-200": "206 236 198", // #ceecc6
		"--color-tertiary-300": "176 225 163", // #b0e1a3
		"--color-tertiary-400": "116 203 95", // #74cb5f
		"--color-tertiary-500": "57 180 26", // #39b41a
		"--color-tertiary-600": "51 162 23", // #33a217
		"--color-tertiary-700": "43 135 20", // #2b8714
		"--color-tertiary-800": "34 108 16", // #226c10
		"--color-tertiary-900": "28 88 13", // #1c580d
		// success | #bcd03c
		"--color-success-50": "245 248 226", // #f5f8e2
		"--color-success-100": "242 246 216", // #f2f6d8
		"--color-success-200": "238 243 206", // #eef3ce
		"--color-success-300": "228 236 177", // #e4ecb1
		"--color-success-400": "208 222 119", // #d0de77
		"--color-success-500": "188 208 60", // #bcd03c
		"--color-success-600": "169 187 54", // #a9bb36
		"--color-success-700": "141 156 45", // #8d9c2d
		"--color-success-800": "113 125 36", // #717d24
		"--color-success-900": "92 102 29", // #5c661d
		// warning | #beb76b
		"--color-warning-50": "245 244 233", // #f5f4e9
		"--color-warning-100": "242 241 225", // #f2f1e1
		"--color-warning-200": "239 237 218", // #efedda
		"--color-warning-300": "229 226 196", // #e5e2c4
		"--color-warning-400": "210 205 151", // #d2cd97
		"--color-warning-500": "190 183 107", // #beb76b
		"--color-warning-600": "171 165 96", // #aba560
		"--color-warning-700": "143 137 80", // #8f8950
		"--color-warning-800": "114 110 64", // #726e40
		"--color-warning-900": "93 90 52", // #5d5a34
		// error | #9cd168
		"--color-error-50": "240 248 232", // #f0f8e8
		"--color-error-100": "235 246 225", // #ebf6e1
		"--color-error-200": "230 244 217", // #e6f4d9
		"--color-error-300": "215 237 195", // #d7edc3
		"--color-error-400": "186 223 149", // #badf95
		"--color-error-500": "156 209 104", // #9cd168
		"--color-error-600": "140 188 94", // #8cbc5e
		"--color-error-700": "117 157 78", // #759d4e
		"--color-error-800": "94 125 62", // #5e7d3e
		"--color-error-900": "76 102 51", // #4c6633
		// surface | #34302d
		"--color-surface-50": "225 224 224", // #e1e0e0
		"--color-surface-100": "214 214 213", // #d6d6d5
		"--color-surface-200": "204 203 203", // #cccbcb
		"--color-surface-300": "174 172 171", // #aeacab
		"--color-surface-400": "113 110 108", // #716e6c
		"--color-surface-500": "52 48 45", // #34302d
		"--color-surface-600": "47 43 41", // #2f2b29
		"--color-surface-700": "39 36 34", // #272422
		"--color-surface-800": "31 29 27", // #1f1d1b
		"--color-surface-900": "25 24 22", // #191816

	}
}