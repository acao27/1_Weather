import { createUseInstanceStoreState } from '@telemetryos/sdk/react'

export const useUiScaleStoreState = createUseInstanceStoreState<number>('ui-scale', 1)

export const useSubtitleStoreState = createUseInstanceStoreState<string>('subtitle', 'Change this line in settings ⚙️ ↗️')
