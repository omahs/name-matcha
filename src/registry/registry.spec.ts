import { describe, expect, it } from 'vitest'
import { Registry, services } from './registry'

describe('registry', () => {
  const registry = new Registry('mainnet')

  it('should get network', () => {
    expect(registry.getNetwork()).toBe('mainnet')
  })

  it('should set network', () => {
    registry.setNetwork('testnet')
    expect(registry.getNetwork()).toBe('testnet')
    registry.setNetwork('mainnet')
    expect(registry.getNetwork()).toBe('mainnet')
  })

  it('should list services', () => {
    expect(
      registry
        .listServices()
        .reduce((acc, cur) => ({ ...acc, [cur]: true }), {})
    ).toEqual({
      [services.archIds]: true,
      [services.icns]: true,
      [services.ibcDomains]: true,
      [services.stargazeNames]: true,
      [services.spaceIds]: true
    })
  })

  it.concurrent(
    'should resolve messi.cosmos on stargazeNames',
    async () => {
      const res = await registry.resolve('messi.cosmos', 'stargazeNames')
      expect(res).toBe('cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh')
    },
    10000
  )

  it.concurrent(
    'should resolve leap_cosmos.juno on icns',
    async () => {
      const res = await registry.resolve('leap_cosmos.juno', 'icns')
      expect(res).toBe('juno19vf5mfr40awvkefw69nl6p3mmlsnacmmu49l8t')
    },
    10000
  )

  it.concurrent(
    'should resolve leapwallet.osmo on ibcDomains',
    async () => {
      const res = await registry.resolve('leapwallet.osmo', 'ibcDomains')
      expect(res).toBe('osmo19vf5mfr40awvkefw69nl6p3mmlsnacmmzu45k9')
    },
    10000
  )

  it.concurrent(
    '[Testnet] should resolve 999.inj on spaceIds',
    async () => {
      registry.setNetwork('testnet')
      const res = await registry.resolve('999.inj', services.spaceIds)
      expect(res).toBe('inj1h4rprmdmf9mx6rje7t3zwqsm9f4cf4gzv3ewnc')
    },
    10000
  )

  it.concurrent(
    '[Testnet] should resolve 000.sei on spaceIds',
    async () => {
      registry.setNetwork('testnet')
      const result = await registry.resolve('000.sei', services.spaceIds)
      expect(result).toBe('sei1qwzw8u4q859l8pjqvfh9a959u8a3kmvpfnzjpw')
    },
    10000
  )

  it.concurrent(
    'should resolve 000.sei on spaceIds',
    async () => {
      registry.setNetwork('mainnet')
      const result = await registry.resolve('000.sei', services.spaceIds)
      expect(result).toBe('sei16fg5g3h57kp58k7grnfql56zsa6evqvqlzpjz9')
    },
    10000
  )

  it.concurrent(
    'should resolve leap.arch on archIds',
    async () => {
      const res = await registry.resolve('leap.arch', 'archIds')
      expect(res).toBe('archway19vf5mfr40awvkefw69nl6p3mmlsnacmmlv6q2q')
    },
    10000
  )

  it.concurrent(
    'should resolveAll for leap.arch',
    async () => {
      const res = await registry.resolveAll('leap.arch')
      expect(res).toEqual({
        archIds: 'archway19vf5mfr40awvkefw69nl6p3mmlsnacmmlv6q2q',
        icns: null,
        ibcDomains: null,
        stargazeNames: null,
        spaceIds: null
      })
    },
    10000
  )

  it.concurrent(
    'should resolveAll for messi.cosmos',
    async () => {
      const res = await registry.resolveAll('messi.cosmos')
      expect(res).toEqual({
        archIds: null,
        icns: null,
        ibcDomains: null,
        stargazeNames: 'cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh',
        spaceIds: null
      })
    },
    10000
  )

  it.concurrent(
    'should resolveAll for allen.sei',
    async () => {
      const res = await registry.resolveAll('allen.sei')
      expect(res).toEqual({
        archIds: null,
        icns: null,
        ibcDomains: null,
        stargazeNames: null,
        spaceIds: 'sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf'
      })
    },
    10000
  )

  it.concurrent(
    '[Testnet] should lookup name for inj1h4rprmdmf9mx6rje7t3zwqsm9f4cf4gzv3ewnc',
    async () => {
      registry.setNetwork('testnet')
      const result = await registry.lookup(
        'inj1h4rprmdmf9mx6rje7t3zwqsm9f4cf4gzv3ewnc',
        services.spaceIds
      )
      expect(result).toEqual('999.inj')
    },
    10000
  )

  it.concurrent(
    '[Testnet] should lookup name for sei1qwzw8u4q859l8pjqvfh9a959u8a3kmvpfnzjpw',
    async () => {
      registry.setNetwork('testnet')
      const result = await registry.lookup(
        'sei1qwzw8u4q859l8pjqvfh9a959u8a3kmvpfnzjpw',
        services.spaceIds
      )
      expect(result).toEqual('000.sei')
    },
    10000
  )

  it.concurrent(
    'should lookup name for sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf',
    async () => {
      registry.setNetwork('mainnet')
      const result = await registry.lookup(
        'sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf',
        services.spaceIds
      )
      expect(result).toEqual('allen.sei')
    },
    10000
  )

  it.concurrent(
    'should lookupAll for cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh',
    async () => {
      const res = await registry.lookupAll(
        'cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh'
      )
      expect(res).toEqual({
        archIds: null,
        icns: 'leap_cosmos.cosmos',
        ibcDomains: 'leapwallet.cosmos',
        stargazeNames: 'messi.cosmos',
        spaceIds: null
      })
    }
  )

  it.concurrent(
    'should lookupAll for archway19vf5mfr40awvkefw69nl6p3mmlsnacmmlv6q2q',
    async () => {
      const res = await registry.lookupAll(
        'archway19vf5mfr40awvkefw69nl6p3mmlsnacmmlv6q2q'
      )
      expect(res).toEqual({
        archIds: 'archfam.arch, leap.arch, leapdegens.arch',
        icns: null,
        ibcDomains: 'leapwallet.archway',
        stargazeNames: 'messi.archway',
        spaceIds: null
      })
    }
  )

  it.concurrent(
    'should lookupAll for sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf',
    async () => {
      const res = await registry.lookupAll(
        'sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf'
      )
      expect(res).toEqual({
        archIds: null,
        icns: null,
        ibcDomains: null,
        stargazeNames: null,
        spaceIds: 'allen.sei'
      })
    }
  )
})
